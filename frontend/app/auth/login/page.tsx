'use client';
import { LoginForm } from "@/components/auth/login-form"
import { AuthLayout } from "@/components/auth/auth-layout"
import withGuest from "@/hoc/withGuest"

function LoginPage() {
  return (
    <AuthLayout
      heading="Analyst Portal"
      subheading="Secure access to the FinXplain RAG Engine"
      footerText="Need access to the platform?"
      footerLinkText="Sign up"
      footerLinkHref="/auth/signup"
    >
      <LoginForm />
    </AuthLayout>
  )
}

export default withGuest(LoginPage);