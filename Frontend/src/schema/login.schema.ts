import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Por favor ingresa un email válido").max(255),
  password: z.string().min(8, "La contraseña debe tener mínimo 8 caracteres"),
});
