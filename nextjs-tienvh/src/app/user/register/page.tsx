import RegisterForm from "@/components/user/RegisterForm";
import AuthLayout from "@/components/layout/AuthLayout";

export default function RegisterPage(){
  return(
    <AuthLayout>
      <RegisterForm/>
    </AuthLayout>
  )
}
