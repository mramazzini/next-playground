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
    return <DashboardPage />;
  } catch (error) {
    console.error(error);
    notFound(); // 404
  }
}
