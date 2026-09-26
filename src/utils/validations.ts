import { email, z } from "zod";

export const signupValidationSchema = z.object({
  firstName: z
    .string({ error: "First Name is required. "})
    .min(3, { message: "The First Name must be minimum 3 characters." })
    .max(20, { message: "The First Name must not be more than 20 characters." })
    .trim(),
  lastName: z
    .string({ error: "Last Name is required. "})
    .min(3, { message: "The Last Name must be minimum 3 characters." })
    .max(20, { message: "The Last Name must not be more than 20 characters." })
    .trim(),
  email: z
    .email({ message: "Please add a valid E-Mail format." })
		.min(1, { message: "The E-Mail is required. Please." }),
  password: z
		.string({ error: "The password is required." })
		.min(8, { message: "The password should be at least 8 chars." })
		.regex(/[A-Z]/, {message: "Passowrd must have at least one big char"})
		.regex(/[a-z]/, {message: "Password must have at least one small char"})
		.regex(/[0-9]/, {message: "The password must have at least one number"}),
	confirmPassword: z
		.string({ error: "The password must be repeated." })
})
.refine((data) => data.password === data.confirmPassword, {
  message: "The password is not the same.",
  path: ["confirmPassword"],
})

export const loginValidationSchema = z.object({
  email: z
    .email({ message: "Please add a valid E-Mail format." })
		.min(1, { message: "The E-Mail is required. Please." }),
  password: z
		.string({ error: "The password is required." })
		.min(8, { message: "The password should be at least 8 chars." })
		.regex(/[A-Z]/, {message: "Passowrd must have at least one big char"})
		.regex(/[a-z]/, {message: "Password must have at least one small char"})
		.regex(/[0-9]/, {message: "The password must have at least one number"}),
});

export const projectValidationSchema = z.object({
  name: z
    .string({ error: "First Name is required. " })
    .min(3, { message: "The First Name must be minimum 3 characters." })
    .max(20, { message: "The First Name must not be more than 20 characters." })
    .trim(),
  description: z
    .string({ error: "First Name is required. " })
    .min(3, { message: "The First Name must be minimum 3 characters." })
    .max(20, { message: "The First Name must not be more than 20 characters." })
    .trim(),
  status: z
    .string({ error: "Status is required" })
    .trim()
});


export const memberValidationSchema = z.object({
  firstName: z
    .string({ error: "First Name is required." })
    .min(2, { message: 'The First Name must be minimum 3 characters.' })
    .max(20, { message: 'The First Name must not be more than 20 characters.' })
    .trim(),
  lastName: z
    .string({ error: "First Name is required." })
    .min(2, { message: 'The First Name must be minimum 3 characters.' })
    .max(20, { message: 'The First Name must not be more than 20 characters.' })
    .trim(),
  email: z
    .email({ message: "Please add a valid E-Mail format." })
		.min(1, { message: "The E-Mail is required. Please." }),
  position: z
    .string( {error: "First Positon is required."} )
    .min(2, { message: 'The Positon must be minimum 3 characters.' })
    .trim(),
})