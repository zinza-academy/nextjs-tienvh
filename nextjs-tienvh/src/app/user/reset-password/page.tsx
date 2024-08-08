import AuthLayout from "@/components/layout/AuthLayout";
import ResetPasswordForm from "@/pages/user/ResetPasswordForm";

export default function ForgotPasswordPage(){
  return(
    <AuthLayout>
      <ResetPasswordForm/>
    </AuthLayout>
  )
}
