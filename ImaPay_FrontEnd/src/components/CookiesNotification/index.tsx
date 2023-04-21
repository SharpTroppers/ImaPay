import React, { useState } from "react";
import styles from "./styles.module.css";
import { useSpring, animated } from "react-spring";

export function CookiesNotification(props: any) {
  const [showOpening, setShowOpening] = useState(true);

  const slide = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: {
      tension: 200,
      friction: 15,
    },
  });

  // const handleClose = () => {
  //   setShowOpening(false);
  //   props.onCloseModal(); // chamando a função onCloseModal passada como prop
  // };

  const handleReject = () => {
    setShowOpening(false);
    props.onCloseModal(); // chamando a função onCloseModal passada como prop
  };

  const handleAccept = () => {
    setShowOpening(false);
    // Add any logic for accepting the cookies here
    props.onCloseModal(); // chamando a função onCloseModal passada como prop
  };

  return (
    <>
      {showOpening && (
        <animated.div className={styles.coockiesModal} style={slide}>
          <animated.div style={slide}>
            <animated.div>
              <animated.h3 className={styles.titleModal}>
                Valorizamos sua privacidade
              </animated.h3>
            </animated.div>
            <animated.p className={styles.cookies}>
              Usamos cookies para aprimorar sua experiência de navegação,
              veicular anúncios ou conteúdo personalizado e analisar nosso
              tráfego. Ao clicar em "Aceitar", você concorda com o uso de
              cookies.
            </animated.p>
          </animated.div>
          <div className={styles.btnContainer}>
            <button
              className={`${styles.cookiesBtn} ${styles.rejectBtn}`}
              onClick={handleReject}
            >
              Rejeitar
            </button>
            <button
              className={`${styles.cookiesBtn} ${styles.acceptBtn}`}
              onClick={handleAccept}
            >
              Aceitar
            </button>
          </div>
        </animated.div>
      )}
    </>
  );
}
