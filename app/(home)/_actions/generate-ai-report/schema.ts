import { isMatch } from "date-fns";
import { z } from "zod";

export const generateAiReportSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM")),
  year: z
    .string()
    .regex(/^\d{4}$/)
    .optional()
    .default(() => new Date().getFullYear().toString()),
});

export type generateAiReportSchema = z.infer<typeof generateAiReportSchema>;
