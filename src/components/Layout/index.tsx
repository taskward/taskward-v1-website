import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../index";

export default function Layout(): JSX.Element {
  return (
    <>
      123
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}
