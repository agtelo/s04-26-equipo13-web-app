import z from "zod";
import { LoginFormSchema } from "@/schema";

export type LoginFormType = z.infer<typeof LoginFormSchema>;
