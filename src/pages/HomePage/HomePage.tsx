import { StarWarsOpening } from "../../components/WellComeModal";
import { CoockiesNotification } from "../../components/CoockiesNotification";
import { useState } from "react";
import { HomeContent } from "../../components/HomeContent";
import { HomeFooter } from "../../components/HomeFooter";

export function HomePage() {
  const [showCookiesNotification, setShowCookiesNotification] = useState(false);

  const handleStarWarsOpeningClose = () => {
    setShowCookiesNotification(true);
  };

  return (
    <>
      <HomeContent />
      <HomeFooter />
      <StarWarsOpening onClose={handleStarWarsOpeningClose} />
      {showCookiesNotification && <CoockiesNotification />}
    </>
  );
}
