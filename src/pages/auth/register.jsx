import { redirect, Form, useNavigation, useActionData } from "react-router-dom";
import Button from "../../components/button";
import { InputBase } from "@mantine/core";
import { z } from "zod";
import { AuthProvider } from "./../../AuthProvider";

export async function Action({ request }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const createUserSchema = z
    .object({
      username: z.string().nonempty({
        message: "username tidak boleh kosong",
      }),
      email: z
        .string()
        .nonempty({ message: "email tidak boleh kosong" })
        .email({ message: "masukkan tipe email yang valid" }),
      password: z
        .string()
        .nonempty({ message: "password tidak boleh kosong" })
        .min(8, { message: "password minimal 8 karakter" }),
      confirmPassword: z
        .string()
        .nonempty({ message: "konfirmasi password anda" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "masukkan pasword anda sebelumnya",
    });

  const userRegister = createUserSchema.safeParse(payload);

  if (!userRegister.success) {
    return { errors: userRegister.error.flatten() };
  }

  const response = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.status == 201) {
    const data = await response.json();
    await AuthProvider.isLogIn(data.token, data.data.id);
    return redirect("/");
  } else {
    return null;
  }
}

export default function PageRegister() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData;
  const errors = actionData?.errors?.fieldErrors;
  console.log(actionData.data);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-bold text-[2rem] text-center mb-6">
          Register
          <span className="text-blue-800 font-bold text-[40px]">.</span>
        </h1>
        <Form method="post" className="w-[25%]">
          <InputBase
            withAsterisk
            mt={"md"}
            label="Username"
            description="masukkan username anda"
            name="username"
            error={errors?.username?.[0]}
          />
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
          <InputBase
            withAsterisk
            mt={"md"}
            type="password"
            label="Konfirmasi Password"
            description="masukkan kembali password anda"
            name="confirmPassword"
            error={errors?.confirmPassword?.[0]}
          />
          <div className="flex justify-end items-center gap-x-5 p-2 mt-2">
            <a href="/login">login</a>
            <Button type="Submit" loading={isSubmitting}>
              Register
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
