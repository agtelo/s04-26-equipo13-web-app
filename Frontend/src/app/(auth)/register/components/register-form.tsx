"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { RegisterFormType } from "@/interfaces";
import { RegisterFormSchema } from "@/schema";
import { useMutation } from "@tanstack/react-query";
import { RegisterService } from "@/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function FormRegister() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { mutate } = useMutation({
    mutationFn: RegisterService,
    onError: (error) => {
      toast.error(error.message);
      return;
    },
    onSuccess: (values) => {
      toast.success(values);
      router.push("/login");
    },
  });

  const onSubmit: SubmitHandler<RegisterFormType> = (values) => mutate(values);

  return (
    <form className="space-y-6 mb-8" onSubmit={handleSubmit(onSubmit)}>
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
              {fieldState.error && (
                <FieldError className="text-destructive text-xs mt-1">
                  {fieldState.error.message}
                </FieldError>
              )}
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
              {fieldState.error && (
                <FieldError className="text-destructive text-xs mt-1">
                  {fieldState.error.message}
                </FieldError>
              )}
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
              {fieldState.error && (
                <FieldError className="text-destructive text-xs mt-1">
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-7 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] h-14 shadow-xl hover:shadow-2xl transition-all"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </FieldGroup>
    </form>
  );
}
