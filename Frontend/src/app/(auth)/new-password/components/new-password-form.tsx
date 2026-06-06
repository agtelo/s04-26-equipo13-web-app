"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { NewPasswordService } from "@/services/newPassword.service";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { NewPasswordFormSchema } from "@/schema";
import { NewPasswordFormType } from "@/interfaces";

export default function NewPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewPasswordFormType>({
    resolver: zodResolver(NewPasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: NewPasswordService,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      router.push("/login");
    },
  });

  const onSubmit = (data: NewPasswordFormType) => {
    mutate({ password: data.password, token });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-8">
      <FieldGroup>
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
        <Controller
          control={control}
          name="repeatPassword"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-5">
                Repeat Password
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
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="w-full py-7 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] h-14 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "New Password"}
        </Button>
      </FieldGroup>
    </form>
  );
}
