import { z } from "zod"

/**
 * Shared client/server validation for the inquiry form. Keeping this in
 * one schema means the server action and the client form can never
 * drift out of sync.
 */
export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120),
  company: z.string().trim().min(1, "Enter your company name.").max(160),
  email: z.string().trim().min(1, "Enter your email address.").email("Enter a valid email address."),
  phone: z.string().trim().min(1, "Enter a phone or WhatsApp number.").max(40),
  targetProduct: z.string().trim().min(1, "Select a target product."),
  purchaseRequirement: z.string().trim().min(1, "Select a purchase requirement."),
  message: z.string().trim().min(10, "Add a few details about your inquiry (minimum 10 characters).").max(2000),
})

export type InquiryInput = z.infer<typeof inquirySchema>

export const purchaseRequirementOptions = [
  { value: "bulk-wholesale", label: "Bulk wholesale" },
  { value: "oem-odm", label: "OEM / ODM private label" },
  { value: "sample-request", label: "Sample request" },
  { value: "other", label: "Other" },
] as const

export const targetProductOptions = [
  { value: "tangerine-peel", label: "Preserved Tangerine Peel" },
  { value: "bergamot", label: "Preserved Bergamot" },
  { value: "lemon", label: "Preserved Lemon" },
  { value: "mango", label: "Preserved Mango" },
  { value: "plum-strips", label: "Sour Plum Strips" },
  { value: "gooseberry", label: "Preserved Indian Gooseberry" },
  { value: "chewy-bites", label: "Fruit Chewy Bites" },
  { value: "ginger-candy", label: "Tangerine-Peel Ginger Candy" },
  { value: "not-sure", label: "Not sure / other" },
] as const
