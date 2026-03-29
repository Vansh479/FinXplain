'use client';
import withGuest from "@/hoc/withGuest";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { AuthLayout } from "@/components/auth/auth-layout"

function ForgotPasswordPage() {
  return (
    <AuthLayout
      heading="Reset Access"
      subheading="Enter your institutional or professional email to recover your account"
      footerText="Remembered your password?"
      footerLinkText="Log in"
      footerLinkHref="/auth/login"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}

export default withGuest(ForgotPasswordPage);