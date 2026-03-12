import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/admin/LoginForm";
import { loginAction } from "@/app/private-admin-portal/login/actions";
import { auth } from "@/auth";
import { ensureFirstAdminUser } from "@/lib/admin/actions";

export default async function AdminLoginPage() {
  await ensureFirstAdminUser();
  const session = await auth();

  if (session?.user) {
    redirect("/private-admin-portal/posts");
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm action={loginAction} />
        </CardContent>
      </Card>
    </main>
  );
}
