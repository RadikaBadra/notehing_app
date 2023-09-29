import { RouterProvider } from "react-router-dom";
import router from "./router";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./AuthProvider";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </MantineProvider>
  );
}
