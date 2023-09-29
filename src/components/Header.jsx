import Button from "./button";
import { AuthProvider } from "./../AuthProvider";
import { redirect } from "react-router-dom";
export default function Header() {
  function logOut() {
    AuthProvider.isLogOut();
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-between px-4 py-4 mt-8">
      <h1 className="text-3xl font-bold">NOTEHING</h1>
      <Button
        onClick={logOut}
        className="bg-sky-100 p-[6px_12px] text-blue-800 border-2 border-blue-800 transition-colors duration-200 hover:bg-blue-800 hover:text-white"
      >
        log out
      </Button>
    </div>
  );
}
