import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { UserPage } from "./pages/UserPage/User";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { PasswordRecoveryPage } from "./pages/PasswordRecoveryPage/PasswordRecoveryPage";
import { SignUpPage } from "./pages/SignUpPage";
import { RootLayout } from "./pages/Root";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { PasswordResetPage } from "./pages/PasswordResetPage/PasswordResetPage";
import { MinhaConta } from "./pages/UserPage/MinhaConta";
import { RequireAuth } from "./components/RequiredAuth";

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
    element: (
      <RequireAuth>
        <UserPage />
      </RequireAuth>
    ),
  },
  {
    path: "/user/minha-conta",
    element: (
      <RequireAuth>
        <MinhaConta />
      </RequireAuth>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
