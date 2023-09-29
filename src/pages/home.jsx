import { useLoaderData, Outlet, Link, Form } from "react-router-dom";
import { Button, InputBase } from "@mantine/core";
import Card from "../components/card";

export async function Loader() {
  const response = await fetch(
    `http://localhost:5000/notes/${localStorage.getItem("userID")}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await response.json();

  return {
    notes: data.data,
  };
}

export default function PageHome() {
  const notes = useLoaderData().notes;

  return (
    <>
      <div className="m-auto">
        {notes.length == 0 && (
          <div className="h-[50vh] flex items-center justify-center">
            <h1 className="text-center">catatan tidak ditemukan</h1>
          </div>
        )}
        <div className="grid grid-rows-1 place-content-center gap-4 mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {notes &&
            notes.map((data) => {
              return (
                <div key={data.id}>
                  <Card>
                    <Card.title>{data.title}</Card.title>
                    <Card.body>{data.content}</Card.body>
                    <Card.footer>
                      <Form method="delete">
                        <InputBase
                          defaultValue={data.id}
                          name="id"
                          display={"none"}
                        />
                        <Button
                          type="submit"
                          key={data.id}
                          className="bg-red-500 duration-500 hover:bg-red-600 text-white py-2 px-4"
                        >
                          delete
                        </Button>
                      </Form>
                      <Button
                        component={Link}
                        to={data.id + "/tulis"}
                        key={data.id}
                        className="bg-blue-500 duration-500	 hover:bg-blue-600 text-white py-2 px-4"
                      >
                        tulis
                      </Button>
                    </Card.footer>
                  </Card>
                  <Outlet />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
