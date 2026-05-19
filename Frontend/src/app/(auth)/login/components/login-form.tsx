"use client";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { LoginFormSchema, LoginFormType } from "./login-form.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { LoginService } from "@/services/login.service";

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const {} = useMutation({
    mutationFn: LoginService,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="w-full mt-7" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="uppercase text-[#8A8A8A] font-bold tracking-wide text-xs ">
                Email Address
              </FieldLabel>
              <Input {...field} placeholder="name@company.com" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="uppercase text-[#8A8A8A] font-bold tracking-wide text-xs ">
                Password
              </FieldLabel>
              <Input {...field} type="password" placeholder="*******" />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field orientation="responsive">
          <Button type="submit" className="mt-7 py-7 uppercase rounded-full">
            Sign In
          </Button>
          <Button className="" type="submit" variant="link" asChild>
            <Link href="/auth/sign-in">Back to Sign In</Link>
          </Button>
        </Field>

        <p className="text-sm text-center my-5 text-[#48473E]">
          Don't have an account?
          <Link href="/register">
            <span className="text-[#1C1C19] bold"> Register</span>
          </Link>
        </p>

        <p className="text-[#8A8A8A] text-[9px] text-center">
          AUTHORIZED ACCESS ONLY. BY CONTINUING, YOU AGREE TO OUR TERMS OF
          PROCESSING.
        </p>
      </FieldGroup>
    </form>
  );
};
