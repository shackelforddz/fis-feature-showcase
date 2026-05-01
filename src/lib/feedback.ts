import { z } from "zod";
import { categories } from "@/content/categories";
import type { CategoryId } from "@/lib/types";

const categoryIds = categories.map((c) => c.id) as [CategoryId, ...CategoryId[]];

export const feedbackSchema = z.object({
  category_id: z.enum(categoryIds),
  quote: z.string().trim().min(1, "Feedback is required").max(500),
  name: z.string().trim().min(1, "Name is required").max(80),
  company: z.string().trim().min(1, "Company is required").max(80),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;

export const wizardSubmissionSchema = z.object({
  category_id: z.enum(categoryIds),
  name: z.string().trim().min(1, "Name is required").max(80),
  company: z.string().trim().min(1, "Company is required").max(80),
  answers: z.object({
    context: z.string().trim().min(1, "Required").max(500),
    oneWord: z
      .string()
      .trim()
      .min(1, "Required")
      .max(40)
      .refine((v) => !/\s/.test(v), { message: "Please use one word" }),
    disappointment: z.enum([
      "very_disappointed",
      "somewhat_disappointed",
      "not_disappointed",
    ]),
    comfort: z.string().trim().min(1, "Required").max(500),
    docsRating: z.number().int().min(1).max(5),
    wishlist: z.string().trim().min(1, "Required").max(500),
  }),
});

export type WizardSubmissionInput = z.infer<typeof wizardSubmissionSchema>;
