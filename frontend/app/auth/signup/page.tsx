'use client';
import withGuest from "@/hoc/withGuest";
import { SignUpForm } from "@/components/auth/signup-form"
import { AuthLayout } from "@/components/auth/auth-layout"

function SignUpPage() {
  return (
    <AuthLayout
      heading="Create Analyst Profile"
      subheading="Join FinXplain AI to automate your financial report synthesis"
      footerText="Already registered?"
      footerLinkText="Log in"
      footerLinkHref="/auth/login"
    >
      <SignUpForm />
    </AuthLayout>
  )
}

export default withGuest(SignUpPage);