import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { UserPage } from "./components/UserPage";

import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/user", element: <UserPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
