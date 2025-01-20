import { getAllUsers } from "@/lib/actions/db/User/read.actions";
import DashboardPage from "@/pages-lib/Dashboard.page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
  keywords: "dashboard, page",
};

export default async function Page() {
  try {
    const users = await getAllUsers();
    return <DashboardPage users={users} />;
  } catch (error) {
    console.error(error);
    notFound(); // 404
  }
}
