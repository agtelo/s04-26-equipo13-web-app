"use client";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { LoginService } from "@/services/login.service";
import { toast } from "sonner";
import { LoginFormSchema } from "@/schema";
import { LoginFormType } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { control, handleSubmit , formState: { isSubmitting } } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: LoginService,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (values) => {
      toast.success(values);
      router.push("/dashboard");
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    mutate(data);
  };

  return (
    <form className="w-full mt-7" onSubmit={handleSubmit(onSubmit)}>
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

 <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex items-center justify-between">
              <FieldLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-5">
                Password
              </FieldLabel>
              <Link href="/forgot-password">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-5">
                  FORGOT?
                </p>
              </Link>
              </div>
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
        <Field orientation="responsive">
          <Button type="submit" className="w-full py-7 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] h-14 shadow-xl hover:shadow-2xl transition-all">
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </Field>

        <p className="text-sm text-center my-5 text-bg">
          Don't have an account?
          <Link href="/register" className="text-xs font-bold text-primary hover:underline transition-all ml-1" >
            <span > Register</span>
          </Link>
        </p>

        <p className="text-muted-foreground text-[9px] text-center">
          AUTHORIZED ACCESS ONLY. BY CONTINUING, YOU AGREE TO OUR TERMS OF
          PROCESSING.
        </p>
      </FieldGroup>
    </form>
  );
};
