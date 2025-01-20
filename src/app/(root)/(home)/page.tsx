import HomePage from "@/pages-lib/Home.page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
  keywords: "home, page",
};

export default function Page() {
  return <HomePage />;
}
