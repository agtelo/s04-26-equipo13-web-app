import z from "zod";
import { RegisterFormSchema } from "@/schema";

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
