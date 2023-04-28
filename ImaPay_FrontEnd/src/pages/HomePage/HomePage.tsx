import { StarWarsOpening } from "../../components/WelcomeModal";
import { CookiesNotification } from "../../components/CookiesNotification";
import { useState } from "react";
import { HomeContent } from "../../components/HomeContent";
import { HomeFooter } from "../../components/HomeFooter";
import styles from "./style.module.css";
import { MainNavigation } from "../../components/MainNavigation";

export function HomePage() {
  const [showCookiesNotification, setShowCookiesNotification] = useState(false);

  const handleStarWarsOpeningClose = () => {
    setShowCookiesNotification(true);
  };

  return (
    <div className={styles["container"]}>
      <HomeContent />
      <HomeFooter />
      <StarWarsOpening onClose={handleStarWarsOpeningClose} />
      {showCookiesNotification && <CookiesNotification />}
    </div>
  );
}
