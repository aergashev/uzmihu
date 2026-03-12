import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/private-admin-portal/login");
  }

  async function logoutAction() {
    "use server";
    await signOut({ redirectTo: "/private-admin-portal/login" });
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Private
            </p>
            <Link
              href="/private-admin-portal/posts"
              className="text-lg font-semibold text-[#1E4FA3]"
            >
              Admin Panel
            </Link>
          </div>
          <form action={logoutAction}>
            <Button variant="outline" type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
