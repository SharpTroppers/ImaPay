import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { UserPage } from "./pages/UserPage/User";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { PasswordRecoveryPage } from "./pages/PasswordRecoveryPage/PasswordRecoveryPage";
import { SignUpPage } from "./pages/SignUpPage";
import { RootLayout } from "./pages/Root";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { PasswordResetPage } from "./pages/PasswordResetPage/PasswordResetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/password-recovery", element: <PasswordRecoveryPage /> },
      { path: "/password-reset", element: <PasswordResetPage /> },
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
