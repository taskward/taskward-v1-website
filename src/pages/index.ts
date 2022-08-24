import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Note = lazy(() => import("./Note"));
const Archive = lazy(() => import("./Archive"));
const Trash = lazy(() => import("./Trash"));
const NotFound = lazy(() => import("./NotFound"));
const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));

export { Home, Note, Archive, Trash, NotFound, Login, Signup };
