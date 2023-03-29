import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { UserPage } from "./components/UserPage";
import { SingIn } from "./components/SingIn";
import { PasswordRecover } from "./components/PasswordRecover";
import { SingUp } from "./components/SignUp";

import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/singin", element: <SingIn /> },
  { path: "/password-recover", element: <PasswordRecover /> },
  { path: "/singup", element: <SingUp /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
