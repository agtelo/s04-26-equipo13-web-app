import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email("Por favor ingresa un email válido").max(255),
});
