import { Outlet } from "react-router-dom";
import { useState } from "react";
import { MainNavigation } from "../components/MainNavigation";
import { HomeContent } from "../components/HomeContent";
import { HomeFooter } from "../components/HomeFooter";
import { StarWarsOpening } from "../components/WelcomeModal";
import { CookiesNotification } from "../components/CookiesNotification";
import { HomePage } from "./HomePage/HomePage";
import styles from "./style.module.css";

export function RootLayout() {
  const [showCookiesNotification, setShowCookiesNotification] = useState(false);

  const handleStarWarsOpeningClose = () => {
    setShowCookiesNotification(true);
  };
  return (
    <div>
      <MainNavigation />
      <Outlet />
    </div>
  );
}
