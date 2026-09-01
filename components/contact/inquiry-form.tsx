"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { initialInquiryState, submitInquiry } from "@/app/actions/inquiry"
import { purchaseRequirementOptions, targetProductOptions } from "@/lib/validation/inquiry"
import { InquiryCaptchaField } from "@/components/inquiry-captcha-field"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" disabled={pending} className="bg-primary text-primary-foreground hover:bg-primary/90">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        "Send inquiry"
      )}
    </Button>
  )
}

export function InquiryForm() {
  const [state, formAction] = useActionState(submitInquiry, initialInquiryState)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status !== "idle") {
      statusRef.current?.focus()
    }
  }, [state])

  const errors = state.fieldErrors ?? {}

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-8">
      {state.status !== "idle" && (
        <Alert
          ref={statusRef}
          tabIndex={-1}
          variant={state.status === "invalid" ? "destructive" : "default"}
          aria-live="polite"
        >
          {state.status === "success" ? (
            <CheckCircle2 aria-hidden="true" />
          ) : (
            <AlertCircle aria-hidden="true" />
          )}
          <AlertTitle>
            {state.status === "invalid"
              ? "Check the form"
              : state.status === "success"
                ? "Thanks for reaching out"
                : "Online form unavailable"}
          </AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <FieldGroup>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.name)}>
            <FieldContent>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input id="name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} required />
              <FieldError>{errors.name}</FieldError>
            </FieldContent>
          </Field>

          <Field data-invalid={Boolean(errors.company)}>
            <FieldContent>
              <FieldLabel htmlFor="company">Company</FieldLabel>
              <Input
                id="company"
                name="company"
                autoComplete="organization"
                aria-invalid={Boolean(errors.company)}
                required
              />
              <FieldError>{errors.company}</FieldError>
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.email)}>
            <FieldContent>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} required />
              <FieldError>{errors.email}</FieldError>
            </FieldContent>
          </Field>

          <Field data-invalid={Boolean(errors.phone)}>
            <FieldContent>
              <FieldLabel htmlFor="phone">Phone / WhatsApp</FieldLabel>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} required />
              <FieldError>{errors.phone}</FieldError>
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.targetProduct)}>
            <FieldContent>
              <FieldLabel htmlFor="targetProduct">Target product</FieldLabel>
              <Select name="targetProduct">
                <SelectTrigger id="targetProduct" className="w-full" aria-invalid={Boolean(errors.targetProduct)}>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {targetProductOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError>{errors.targetProduct}</FieldError>
            </FieldContent>
          </Field>

          <Field data-invalid={Boolean(errors.purchaseRequirement)}>
            <FieldContent>
              <FieldLabel htmlFor="purchaseRequirement">Purchase requirement</FieldLabel>
              <Select name="purchaseRequirement">
                <SelectTrigger
                  id="purchaseRequirement"
                  className="w-full"
                  aria-invalid={Boolean(errors.purchaseRequirement)}
                >
                  <SelectValue placeholder="Select a requirement" />
                </SelectTrigger>
                <SelectContent>
                  {purchaseRequirementOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError>{errors.purchaseRequirement}</FieldError>
            </FieldContent>
          </Field>
        </div>

        <Field data-invalid={Boolean(errors.message)}>
          <FieldContent>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your target product, order volume and any packaging requirements."
              aria-invalid={Boolean(errors.message)}
              required
            />
            <FieldError>{errors.message}</FieldError>
          </FieldContent>
        </Field>
      </FieldGroup>

      <InquiryCaptchaField
        tokenName="captchaToken"
        answerName="captchaAnswer"
        scopeName="captchaScope"
        refreshKey={state.challengeVersion ?? 0}
      />

      <SubmitButton />
    </form>
  )
}
