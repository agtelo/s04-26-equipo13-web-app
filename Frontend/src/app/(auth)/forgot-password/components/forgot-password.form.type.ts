import z from "zod";

export const ForgotPasswordFormSchema = z.object({
        email: z.email(),
});

export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordFormSchema>;