import { z } from "zod";

/**
 * Every payload that crosses the network boundary is parsed here.
 * The same schemas run on the client (instant feedback) and on the server
 * (the boundary that actually matters — client validation is a courtesy).
 */

const name = z
  .string()
  .trim()
  .min(2, "Please enter your name.")
  .max(80, "That name is too long.")
  .regex(/^[\p{L}\p{M}'\-.\s]+$/u, "Please use letters only.");

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(5, "Please enter your email address.")
  .max(160, "That email address is too long.")
  .email("Please enter a valid email address.");

const phone = z
  .string()
  .trim()
  .max(24, "That number is too long.")
  .regex(/^[+\d][\d\s\-()]{6,}$/, "Please enter a valid telephone number.")
  .optional()
  .or(z.literal(""));

const message = z
  .string()
  .trim()
  .min(10, "Please tell us a little more — at least 10 characters.")
  .max(2000, "Please keep your message under 2000 characters.");

/** Hidden field. Real people leave it empty; most bots fill it in. */
const honeypot = z.literal("").optional();

export const enquirySchema = z.object({
  name,
  email,
  phone,
  message,
  productSlug: z.string().trim().max(120).optional(),
  productName: z.string().trim().max(160).optional(),
  enquiryType: z.enum(["general", "product", "custom"]).default("general"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm we may contact you about this enquiry." }),
  }),
  company: honeypot,
});

export const newsletterSchema = z.object({
  email,
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you would like to receive our letters." }),
  }),
  company: honeypot,
});

export const productQuerySchema = z.object({
  collection: z.string().trim().max(80).optional(),
  q: z.string().trim().max(120).optional(),
  minCarat: z.coerce.number().min(0).max(100).optional(),
  maxCarat: z.coerce.number().min(0).max(100).optional(),
  limit: z.coerce.number().int().min(1).max(48).default(24),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
