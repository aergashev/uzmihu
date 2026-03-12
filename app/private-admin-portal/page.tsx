import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function PrivateAdminPortalIndexPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/private-admin-portal/posts");
  }

  redirect("/private-admin-portal/login");
}
