import { createBrowserRouter } from "react-router-dom";
import DefaultLayout, { Action as addAction } from "./layout/default";
import PageHome, { Loader as notesLoader } from "./pages/home";
import PageLogin, { Action as loginAction } from "./pages/auth/login";
import PageRegister, { Action as registerAction } from "./pages/auth/register";
import { ProtectedHome, ProtectedLogin } from "./ProtectedLogin";
import PageEdit, {
  Loader as noteIDLoader,
  Action as updateNoteAction,
} from "./pages/editNote";
// import PageAdd, { Action as addAction } from "./pages/addNotes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    action: addAction,
    children: [
      {
        index: true,
        element: (
          <ProtectedLogin>
            <PageHome />
          </ProtectedLogin>
        ),
        loader: notesLoader,
      },
      {
        path: ":id/tulis",
        element: (
          <ProtectedLogin>
            <PageEdit />
          </ProtectedLogin>
        ),
        loader: noteIDLoader,
        action: updateNoteAction,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectedHome>
        <PageLogin />
      </ProtectedHome>
    ),
    action: loginAction,
  },
  {
    path: "/register",
    element: (
      <ProtectedHome>
        <PageRegister />
      </ProtectedHome>
    ),
    action: registerAction,
  },
]);

export default router;
