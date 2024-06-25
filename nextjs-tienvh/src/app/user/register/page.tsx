import RegisterForm from "@/components/user/RegisterForm";
import AuthLayout from "@/components/layout/AuthLayout";

export default function LoginPage(){
  return(
    <AuthLayout>
      <RegisterForm/>
    </AuthLayout>
  )
}