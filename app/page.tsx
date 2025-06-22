import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Logo className="h-16 w-16" />
          <h1 className="text-2xl font-bold text-gray-900">Anne Creations</h1>
          <p className="text-sm text-gray-500">Embroidery Management System</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
