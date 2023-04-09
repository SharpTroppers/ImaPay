import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { UserPage } from "./pages/UserPage/UserPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { PasswordRecoverPage } from "./pages/PasswordRecoveryPage/PasswordRecoverPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { RootLayout } from "./pages/Root";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/user", element: <UserPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/password-recover", element: <PasswordRecoverPage /> },
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;