import { z } from "zod";

export const RegisterFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es muy largo'),
  
  email: z
    .string()
    .email('Por favor ingresa un email válido')
    .max(255),
  
  password: z
    .string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener una mayúscula')
    .regex(/[a-z]/, 'Debe contener una minúscula')
    .regex(/[@$!%*?&]/, 'Debe contener un carácter especial')
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;