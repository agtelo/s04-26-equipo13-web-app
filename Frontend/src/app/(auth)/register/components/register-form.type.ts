import z from "zod";

export const RegisterFormSchema = z.object({
        fullName: z.string(),
        email: z.email(),
        password: z.string(),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;