import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/shared/Logo';
import React from 'react'
import ForgotPasswordForm from './components/forgot-password-form';
import Link from 'next/link';


export default function ForgotPasswordPage() {
  return (
    <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden w-full max-w-md">
      <CardHeader className="text-center pt-16 pb-10">
        <Logo className="text-primary w-14 h-14 mx-auto mb-6" />
        <CardTitle className="text-4xl font-serif italic mb-2">Distiller</CardTitle>
        <CardDescription className="uppercase text-[10px] font-bold tracking-[0.2em] text-muted-foreground/60 flex flex-col gap-1 items-center">
          <span>AI Content Pipeline</span>
          <span className="opacity-75">by TalentCircle</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 pb-16 sm:px-14">
        <ForgotPasswordForm />

        <div className="text-center space-y-4 flex flex-col">
          <Link
            href="/login"
            className="text-xs font-bold text-primary hover:underline transition-all"
          >
            Back to Sign In
          </Link>
        </div>
        <p className="mt-8 text-[10px] text-muted-foreground leading-relaxed max-w-[240px] mx-auto uppercase tracking-tighter text-center">
          Authorized access only. By continuing, you agree to our terms of processing.
        </p>
      </CardContent>
    </Card>
  )
}
