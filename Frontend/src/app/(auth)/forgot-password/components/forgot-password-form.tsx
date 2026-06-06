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
import { forgotPasswordService } from "@/services/forgot.service";
import { toast } from "sonner";
import { ForgotPasswordFormSchema } from "@/schema";
import { ForgotPasswordFormType } from "@/interfaces";

export default function ForgotPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: forgotPasswordService,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });

  const onSubmit = (data: ForgotPasswordFormType) => {
    mutate(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-8">
      <FieldGroup>
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
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-7 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] h-14 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Reset Password"}
        </Button>
      </FieldGroup>
    </form>
  );
}
