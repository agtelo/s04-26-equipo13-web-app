import z from "zod";
import { NewPasswordFormSchema } from "@/schema";

export type NewPasswordFormType = z.infer<typeof NewPasswordFormSchema>;

export interface NewPasswordPayload {
  password: string;
  token: string;
}
