import LoginPage from "@/pages-lib/Login.page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account to access absolutely nothing.",
  openGraph: {
    type: "website",

    title: "Login",
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
  return <LoginPage />;
}
