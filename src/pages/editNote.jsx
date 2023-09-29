import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { InputBase, Textarea } from "@mantine/core";
import Button from "../components/button";
import { z } from "zod";

export async function Loader({ params }) {
  const response = await fetch(`http://localhost:5000/note/${params.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();

  return {
    note: data.data,
  };
}

export async function Action({ request, params }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const createNoteSchema = z.object({
    title: z.string().nonempty({ message: "judul tidak boleh kosong" }),
    content: z.string().nonempty({ message: "konten tidak boleh kosong" }),
  });

  const notePost = createNoteSchema.safeParse(payload);
  if (!notePost.success) {
    return { errors: notePost.error.flatten() };
  }

  const response = await fetch(`http://localhost:5000/note/${params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });

  if (response.status == 201) {
    return redirect("/");
  } else {
    return null;
  }
}

export default function PageEdit() {
  const note = useLoaderData().note;

  return (
    <>
      <div className="w-[50%] h-fit p-6 bg-white m-auto">
        <h1 className="text-center text-[30px] font-bold">catatanmu</h1>
        <Form className="m-auto py-6" method="patch">
          <InputBase defaultValue={note.id} name="id" display={"none"} />
          <InputBase
            defaultValue={localStorage.getItem("userID")}
            name="author_id"
            display={"none"}
          />
          <InputBase
            withAsterisk
            mt={"md"}
            label="judul"
            description="masukkan judul catatan anda"
            name="title"
            defaultValue={note.title}
            // error={errors?.title?.[0]}
          />
          <Textarea
            autosize
            minRows={6}
            className="mt-4"
            label="Catatan"
            description="catatan kebutuhan anda"
            placeholder="masukkan catatan anda"
            name="content"
            defaultValue={note.content}
            // error={errors?.content?.[0]}
          />
          <div className="flex justify-end items-center gap-4 mt-6">
            <Link
              type="Button"
              to={"/"}
              // onClick={closePopUp}
              className="bg-sky-100 p-[6px_12px] text-blue-800 border-2 border-blue-800 transition-colors duration-200 hover:bg-blue-800 hover:text-white"
            >
              Batal
            </Link>
            <Button type="Submit">Tulis</Button>
          </div>
        </Form>
      </div>
    </>
  );
}
