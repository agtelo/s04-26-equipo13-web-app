'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field'
import { ForgotPasswordFormSchema, ForgotPasswordFormType } from "./forgot-password.form.type";

export default function ForgotPasswordForm() {
  const { control } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
  })
  
  return (
    <form  className="space-y-6 mb-8">
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          type="submit"
          className="w-full py-7 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] h-14 shadow-xl hover:shadow-2xl transition-all"
        >
          Reset Password
        </Button>
      </FieldGroup>
    </form>
  )
}