import { z } from "zod";

// Zod schema for runtime validation
export const JobFormDataSchema = z.object({
  title: z
    .string()
    .min(1, "Job title is required")
    .max(200, "Job title must be 200 characters or less")
    .trim(),
  location: z
    .string()
    .min(1, "Location is required")
    .max(200, "Location must be 200 characters or less")
    .trim(),
  employmentType: z.enum(
    ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
    {
      message: "Invalid employment type",
    }
  ),
  seniorityLevel: z.enum(["Junior", "Mid", "Senior", "Principal"], {
    message: "Invalid seniority level",
  }),
  salary: z
    .object({
      min: z.number().min(0, "Minimum salary must be 0 or greater"),
      max: z.number().min(0, "Maximum salary must be 0 or greater"),
      currency: z
        .string()
        .length(3, "Currency must be 3 characters (e.g., USD, EUR)")
        .toUpperCase(),
    })
    .refine((data) => data.max >= data.min, {
      message: "Maximum salary must be greater than or equal to minimum salary",
      path: ["max"],
    })
    .optional(),
  techStack: z.array(z.string().trim().min(1)).default([]),
});

// Slug validation schema
export const SlugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(200, "Slug must be 200 characters or less")
  .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens");

// TypeScript type inferred from Zod schema (runtime validation + type safety!)
export type JobFormData = z.infer<typeof JobFormDataSchema>;

