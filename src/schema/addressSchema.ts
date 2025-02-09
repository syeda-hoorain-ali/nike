import { z } from "zod";

export const addressSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters"),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters"),

    email: z
        .string()
        .email("Invalid email address"),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits"),

    pan: z
        .string()
        .min(10, "PAN must be exactly 10 characters")
        .max(10, "PAN must be exactly 10 characters"),

    addressLine1: z
        .string()
        .min(5, "Address Line 1 is required"),

    addressLine2: z
        .string()
        .optional(),

    addressLine3: z
        .string()
        .optional(),

    postalCode: z
        .string()
        .min(4, "Invalid postal code"),

    country: z
        .string()
        .min(2, "Country is required"),

    state: z
        .string()
        .min(2, "State/Territory is required"),

    city: z
        .string()
        .min(2, "City/Locality is required"),

    privacyPolicy: z
        .literal(true, {
            required_error: "Required",
            invalid_type_error: "Required"
        })
});
