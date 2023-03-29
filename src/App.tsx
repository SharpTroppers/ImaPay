import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { UserPage } from "./components/UserPage";
import { Login } from "./components/Login";
import { PasswordRecover } from "./components/PasswordRecover";
import { SingUp } from "./components/SignUp";

import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/login", element: <Login /> },
  { path: "/password-recover", element: <PasswordRecover /> },
  { path: "/singup", element: <SingUp /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
