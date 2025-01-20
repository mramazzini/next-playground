import LoginForm from "@/components/forms/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Next Playground",
  description: "Login to your account to access absolutely nothing.",
  openGraph: {
    type: "website",

    title: "Login - Next Playground",
    description: "Login to your account to access absolutely nothing.",
    images: [
      {
        url: "https://th.bing.com/th/id/OIP.X2sssusvx-GI-_8zr6wqcwHaEK?rs=1&pid=ImgDetMain",
        width: 1280,
        height: 720,
        alt: "Senior Dev",
      },
    ],
  },
};

export default function Page() {
  return (
    <main className="p-4 flex w-full justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
