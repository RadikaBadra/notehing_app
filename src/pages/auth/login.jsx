import { redirect, Form, useNavigation, useActionData } from "react-router-dom";
import Button from "../../components/button";
import { InputBase } from "@mantine/core";
import { z } from "zod";
import { AuthProvider } from "./../../AuthProvider";

export async function Action({ request }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const createUserSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "email tidak boleh kosong" })
      .email({ message: "masukkan tipe email yang valid" }),
    password: z
      .string()
      .nonempty({ message: "password tidak boleh kosong" })
      .min(8, { message: "password minimal 8 karakter" }),
  });

  const userLogin = createUserSchema.safeParse(payload);
  if (!userLogin.success) {
    return { errors: userLogin.error.flatten() };
  }

  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.status == 200) {
    const data = await response.json();
    await AuthProvider.isLogIn(data.token, data.data.id);
    return redirect(`/`);
  } else {
    return null;
  }
}

export default function PageLogin() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData();
  const errors = actionData?.errors?.fieldErrors;

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-bold text-[2rem] text-center mb-4">
          Login<span className="text-blue-800 font-bold text-[40px]">.</span>
        </h1>
        <Form className="w-[25%]" method="post">
          <InputBase
            withAsterisk
            mt={"md"}
            label="Email"
            description="masukkan email anda"
            name="email"
            error={errors?.email?.[0]}
          />
          <InputBase
            withAsterisk
            mt={"md"}
            type="password"
            label="Password"
            description="masukkan password anda"
            name="password"
            error={errors?.password?.[0]}
          />
          <div className="flex justify-end items-center gap-x-5 p-2 mt-2">
            <a href="/register">register</a>
            <Button type="Submit" loading={isSubmitting}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
