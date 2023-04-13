import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { UserPage } from "./pages/UserPage/User";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { PasswordRecoverPage } from "./pages/PasswordRecoveryPage/PasswordRecoverPage";
import { SignUpPage } from "./pages/SignUpPage";
import { RootLayout } from "./pages/Root";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/password-recovery", element: <PasswordRecoverPage /> },
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
