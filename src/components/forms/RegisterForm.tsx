"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Loading from "../UI/Loading";
import { Form, Formik } from "formik";
import FormField from "../UI/Formik/FormField";
import LoadingButton from "../UI/Formik/LoadingButton";
import * as Yup from "yup";
import ErrorModal from "../modal/templates/ErrorModal";
import { useAuth } from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";

interface SignupUserInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { id, openModal } = useModal();
  const [modalMessage, setModalMessage] = useState("");
  const { isLoading, register } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = async (values: SignupUserInput) => {
    const errorMessage = await register(values);

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

  const signupSchema = Yup.object().shape({
    email: Yup.string().email("Not a valid Email").required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be 8 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  return (
    <>
      <ErrorModal message={modalMessage} id={id} />
      <div className="bg-base-300 p-4 rounded-xl">
        <h1 className="text-3xl font-bold mb-4 divider">Signup</h1>
        <Formik
          initialValues={
            {
              email: "",
              username: "",
              password: "",
              confirmPassword: "",
            } as SignupUserInput
          }
          validationSchema={signupSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <FormField
              as="input"
              label="Email"
              name="email"
              formProps={{
                placeholder: "Email",
                type: "email",
              }}
            />
            <FormField
              as="input"
              label="Username"
              name="username"
              formProps={{
                type: "text",
                placeholder: "Username",
              }}
            />
            <FormField
              as="input"
              label="Password"
              name="password"
              formProps={{
                type: "password",
                placeholder: "Password",
              }}
            />
            <FormField
              as="input"
              label="Confirm Password"
              name="confirmPassword"
              formProps={{
                type: "password",
                placeholder: "Confirm Password",
              }}
            />
            <LoadingButton type="submit" isLoading={isLoading}>
              Signup
            </LoadingButton>
            <div className="divider divider-accent"></div>
            <p className="">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login -&gt;
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </>
  );
};
const RegisterForm = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Register />
    </Suspense>
  );
};

export default RegisterForm;
