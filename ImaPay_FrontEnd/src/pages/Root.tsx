import { Outlet } from "react-router-dom";
import { MainNavigation } from "../components/MainNavigation";

export function RootLayout() {
  return (
    <div>
      {/* <MainNavigation /> */}
      <Outlet />
    </div>
  );
}
