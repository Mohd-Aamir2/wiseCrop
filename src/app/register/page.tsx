import Link from "next/link";
import { MultiStepRegisterForm } from "@/components/auth/multi-step-register-form";
import { Logo } from "@/components/logo";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
       <div className="absolute top-8 left-8">
        <Link href="/" aria-label="Back to Home">
          <Logo />
        </Link>
      </div>
      <MultiStepRegisterForm />
    </div>
  );
}
