import RegisterForm from "@/components/forms/RegisterForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register - Next Playground",
  description: "Create an account to access absolutely nothing.",
  openGraph: {
    type: "website",

    title: "Register - Next Playground",
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
  return (
    <main className="p-4 flex w-full justify-center">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
};

export default Page;
