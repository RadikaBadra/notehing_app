import { Outlet, useNavigation } from "react-router-dom";
import { FaList, FaStickyNote } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { MdArchive } from "react-icons/md";
import { useState, useEffect } from "react";
import Button from "../components/button";
import { useNavigate, Form, useActionData } from "react-router-dom";
import PopUp from "../components/PopUp";
import { InputBase, LoadingOverlay, Textarea } from "@mantine/core";
import Header from "../components/header";
import { z } from "zod";

export async function Action({ request }) {
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

  const response = await fetch("http://localhost:5000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });

  if (response.status == 201) {
    const data = await response.json();
    return { note: data };
  } else {
    return null;
  }
}

export default function DefaultLayout() {
  const [popUp, setPopUp] = useState(false);
  const [active, setActive] = useState("note");
  const actionData = useActionData();
  const errors = actionData?.errors?.fieldErrors;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const note = actionData?.note;

  const navigateNotes = () => {
    navigate("/");
    setActive("note");
  };

  const handlePopUp = () => {
    setPopUp(true);
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  useEffect(() => {
    if (note) {
      setPopUp(false);
    }
  }, [note]);

  return (
    <div className="w-11/12 lg:w-3/4 m-auto">
      <Header />
      {popUp && (
        <PopUp>
          <div className="w-[50%] h-fit p-6 bg-white">
            <h1 className="text-center text-[30px] font-bold">catatan baru</h1>
            <Form className="m-auto py-6" method="post">
              <InputBase
                defaultValue={localStorage.getItem("userID")}
                name="author_id"
                display={"none"}
              />
              <InputBase
                withAsterisk
                mt={"md"}
                label="Judul"
                description="masukkan judul catatan anda"
                name="title"
                error={errors?.title?.[0]}
              />
              <Textarea
                autosize
                minRows={6}
                className="mt-4"
                label="Catatan"
                description="catatan kebutuhan anda"
                placeholder="masukkan catatan anda"
                name="content"
                error={errors?.content?.[0]}
              />
              <div className="flex justify-end items-center gap-4 mt-6">
                <Button
                  type="Button"
                  onClick={closePopUp}
                  className="bg-sky-100 p-[6px_12px] text-blue-800 border-2 border-blue-800 transition-colors duration-200 hover:bg-blue-800 hover:text-white"
                >
                  Batal
                </Button>
                <Button type="Submit">Tambahkan</Button>
              </div>
            </Form>
          </div>
        </PopUp>
      )}
      <div className="flex justify-between px-4 py-4 items-center">
        <div className="left-button flex">
          <Button
            className={
              active == "note"
                ? `p-2 bg-white text-blue-800`
                : `p-2 bg-gray-300 text-black `
            }
            onClick={navigateNotes}
          >
            <FaStickyNote size={23} />
          </Button>
          <Button
            className={
              active == "todo"
                ? `p-2 bg-white text-blue-800`
                : `p-2 bg-gray-300 text-black `
            }
            onClick={() => setActive("todo")}
          >
            <FaList size={23} />
          </Button>
        </div>
        <div className="right-Button flex">
          <Button
            onClick={handlePopUp}
            className="flex py-2 items-center justify-center w-24 gap-x-2 bg-blue-800 text-white hover:bg-blue-900 transition duration-300"
          >
            <BsPencilSquare />
            NEW
          </Button>
          <Button className="p-2 bg-gray-300">
            <MdArchive size={23} />
          </Button>
        </div>
      </div>
      <LoadingOverlay visible={navigation.state === "loading"} />
      <Outlet />
    </div>
  );
}
