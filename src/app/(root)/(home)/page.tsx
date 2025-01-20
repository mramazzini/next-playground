import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
  keywords: "home, page",
};

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/login">Login</Link>
      <Link href="/register">Signup</Link>
    </div>
  );
}
