import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminClient from "./AdminClient";
import { redirect } from "next/navigation";
export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <AdminClient session={session} />;
}
