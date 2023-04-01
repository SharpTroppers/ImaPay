import React, { useState } from "react";
import styles from "./styles.module.css";
import { useSpring, animated } from "react-spring";

export function CoockiesNotification() {
  const [showOpening, setShowOpening] = useState(true);

  const slide = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: {
      tension: 200,
      friction: 15,
    },
  });

  const handleClose = () => {
    setShowOpening(false);
  };
  return (
    <>
      {showOpening && (
        <div className={`${styles["coockies-modal"]}`}>
          <animated.div>
            <animated.div>
              <animated.h3 className={`${styles["title-modal"]}`}>
                Valorizamos sua privacidade
              </animated.h3>
            </animated.div>
            <animated.p className={`${styles["cookies"]}`}>
              Usamos cookies para aprimorar sua experiência de navegação,
              veicular anúncios ou conteúdo personalizado e analisar nosso
              tráfego. Ao clicar em "Aceitar", você concorda com o uso de
              cookies.
            </animated.p>
          </animated.div>
          <animated.button
            className={`${styles["cookies-btn"]} ${styles["reject-btn"]}`}
          >
            Rejeitar
          </animated.button>
          <animated.button
            className={`${styles["cookies-btn"]} ${styles["accept-btn"]}`}
          >
            Aceitar
          </animated.button>
        </div>
      )}
    </>
  );
}
