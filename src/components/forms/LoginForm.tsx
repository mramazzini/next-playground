"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Loading from "../UI/Loading";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormField from "../UI/Formik/FormField";
import LoadingButton from "../UI/Formik/LoadingButton";
import useModal from "@/hooks/useModal";
import ErrorModal from "../modal/templates/ErrorModal";
import { useAuth } from "@/hooks/useAuth";

interface UserInput {
  emailOrUsername: string;
  password: string;
}

const Login = () => {
  const { openModal, id } = useModal();
  const { isLoading, login } = useAuth();
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = async (values: UserInput) => {
    const errorMessage = await login(values);

    if (errorMessage) {
      setModalMessage(errorMessage);
      openModal();
      return;
    }

    // Redirect to last page
    if (params?.get("redirect")) {
      const redirect = params.get("redirect") as string;
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/dashboard");
      }
    } else {
      router.push("/dashboard");
    }
  };

  const loginSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <>
      <ErrorModal id={id} message={modalMessage} />
      <div className="bg-base-300 p-4 rounded-xl">
        <h1 className="text-3xl font-bold mb-4 divider">Login</h1>
        <Formik
          initialValues={
            {
              emailOrUsername: "",
              password: "",
            } as UserInput
          }
          validationSchema={loginSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <FormField
              as="input"
              name="emailOrUsername"
              label="Email or Username"
              formProps={{
                type: "text",
                placeholder: "Email or Username",
              }}
            />
            <FormField
              as="input"
              name="password"
              label="Password"
              formProps={{
                type: "password",
                placeholder: "Password",
              }}
            />
            <LoadingButton type="submit" isLoading={isLoading}>
              Login
            </LoadingButton>
            <div className="divider divider-accent"></div>
            <p className="">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-info hover:link">
                Register -&gt;
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </>
  );
};

const LoginForm = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  );
};

export default LoginForm;
