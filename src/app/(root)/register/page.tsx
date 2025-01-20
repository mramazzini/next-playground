import RegisterPage from "@/pages-lib/Register.Page";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register - Next Playground",
  description: "Create an account to access absolutely nothing.",
  openGraph: {
    type: "website",

    title: "Register",
    description: "Create an account to access absolutely nothing.",
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

const Page = () => {
  return <RegisterPage />;
};

export default Page;
