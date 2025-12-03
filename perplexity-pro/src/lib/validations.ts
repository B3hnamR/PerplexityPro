import { z } from "zod";

export const paymentSchema = z.object({
    amount: z.number().min(1000, "Amount must be at least 1000 Toman"),
    description: z.string().min(3, "Description is too short").max(255),
    email: z.string().email("Invalid email address"),
    mobile: z.string().regex(/^09[0-9]{9}$/, "Invalid mobile number format"),
    customData: z.record(z.string(), z.string()).optional(),
    quantity: z.number().int().min(1).max(50).optional(),
});

export const customFieldSchema = z.object({
    label: z.string().min(1, "Label is required").max(50),
    name: z.string().min(1, "Name is required").regex(/^[a-z0-9_]+$/, "Name must be lowercase alphanumeric with underscores"),
    type: z.enum(["text", "number", "textarea", "select"]),
    required: z.boolean(),
    options: z.array(z.string()).optional(),
});
