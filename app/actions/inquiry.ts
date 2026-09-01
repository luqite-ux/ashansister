"use server"

import { inquirySchema } from "@/lib/validation/inquiry"
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from "@/lib/inquiry-captcha"

export type InquiryActionState = {
  status: "idle" | "invalid" | "not_configured" | "success"
  message: string
  fieldErrors?: Partial<Record<keyof typeof inquirySchema.shape, string>>
  challengeVersion?: number
}

export const initialInquiryState: InquiryActionState = {
  status: "idle",
  message: "",
}

/**
 * Inquiry submission boundary.
 *
 * Server-side validation is real and enforced below. What is
 * intentionally NOT wired up yet:
 *
 *   1. Persistence — insert the validated inquiry into Supabase
 *      (e.g. an `inquiries` table) once that integration is connected.
 *   2. CAPTCHA — verify a server-issued, four-character image CAPTCHA
 *      code submitted alongside the form before accepting the inquiry.
 *      Generate the challenge server-side, store it (e.g. in a signed
 *      cookie or short-lived Supabase row), and compare it here.
 *
 * Until both are wired up, this action deliberately returns a
 * "not_configured" status instead of a fake success message, per the
 * project's no-fake-success requirement.
 */
export async function submitInquiry(
  _prevState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    targetProduct: formData.get("targetProduct")?.toString() ?? "",
    purchaseRequirement: formData.get("purchaseRequirement")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  }

  const result = inquirySchema.safeParse(raw)

  if (!result.success) {
    const fieldErrors: InquiryActionState["fieldErrors"] = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof typeof inquirySchema.shape
      if (!fieldErrors[field]) fieldErrors[field] = issue.message
    }
    return {
      status: "invalid",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    }
  }

  const secret = process.env.CAPTCHA_SECRET?.trim()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim() ?? ""
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, "") ?? ""
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? ""
  if (!secret || !tenantId || !supabaseUrl || !serviceRoleKey) {
    return { status: "not_configured", message: "Online inquiry service is temporarily unavailable. Please use the direct contact details on this page.", challengeVersion: Date.now() }
  }

  try {
    const captcha = await verifyCaptchaSubmission({
      secret,
      ...createSupabaseCaptchaContextFromEnv(),
      scope: formData.get("captchaScope")?.toString() ?? "",
      token: formData.get("captchaToken")?.toString() ?? "",
      answer: formData.get("captchaAnswer")?.toString() ?? "",
    })
    if (!captcha.ok) {
      return { status: "invalid", message: "The verification code is incorrect or expired. Please try the new image.", challengeVersion: Date.now() }
    }
  } catch {
    return { status: "not_configured", message: "Verification service is temporarily unavailable. Please try again later.", challengeVersion: Date.now() }
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/inquiries?select=id`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      "content-type": "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify({
      tenant_id: tenantId,
      name: result.data.name,
      company: result.data.company,
      email: result.data.email,
      phone: result.data.phone,
      subject: `${result.data.targetProduct} · ${result.data.purchaseRequirement}`,
      message: result.data.message,
      status: "unread",
    }),
    cache: "no-store",
  })
  if (!response.ok) return { status: "not_configured", message: "Submission failed. Please try again.", challengeVersion: Date.now() }
  const rows = await response.json().catch(() => []) as Array<{ id?: string }>
  if (rows.length !== 1 || !rows[0]?.id) return { status: "not_configured", message: "Submission failed. Please try again.", challengeVersion: Date.now() }
  return { status: "success", message: "Your inquiry has been received. We will follow up using the contact details provided.", challengeVersion: Date.now() }
}
