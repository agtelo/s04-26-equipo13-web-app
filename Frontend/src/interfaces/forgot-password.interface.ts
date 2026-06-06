import z from "zod";
import { ForgotPasswordFormSchema } from "@/schema";

export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordFormSchema>;
