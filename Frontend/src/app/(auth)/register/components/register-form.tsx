"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { RegisterFormType } from "@/interfaces";
import { RegisterFormSchema } from "@/schema";

export default function FormRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const { control } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onChange",
  });

  return (
    <form className="space-y-6 mb-8">
      <FieldGroup>
        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-5">
                Full Name
              </FieldLabel>
              <Input
                {...field}
                type="text"
                className="rounded-full px-8 bg-secondary/50 border-none h-14"
                placeholder="John Doe"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-5">
                Email Address
              </FieldLabel>
              <Input
                {...field}
                type="email"
                className="rounded-full px-8 bg-secondary/50 border-none h-14"
                placeholder="name@company.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-5">
                Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  className="rounded-full px-8 bg-secondary/50 border-none h-14 pr-14"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          type="submit"
          className="w-full py-7 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] h-14 shadow-xl hover:shadow-2xl transition-all"
        >
          Create Account
        </Button>
      </FieldGroup>
    </form>
  );
}

