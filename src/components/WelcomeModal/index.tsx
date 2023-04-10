import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./style.module.css";

export function StarWarsOpening({ onClose }: any) {
  const [showOpening, setShowOpening] = useState(true);

  const slide = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: {
      tension: 10,
      friction: 15,
    },
  });

  const handleClose = () => {
    setShowOpening(false);
    onClose(); // Chama a função onClose passada por props
  };

  return (
    <>
      {showOpening && (
        <div className={styles.containerStar}>
          <animated.h1
            className={`${styles.slide} ${styles.title}`}
            style={slide}
          >
            Bem vindo a frota novo Trooper...
          </animated.h1>
          <animated.h2
            className={`${styles["slide"]} ${styles["subtitle"]}`}
            style={slide}
          >
            Mesmo na mais distante galáxia, seu dinheiro estará seguro.
          </animated.h2>
          <animated.h3
            className={`${styles["slide"]} ${styles["subtitle"]}`}
            style={slide}
          >
            Prossiga para uma experiencia incrivel.
          </animated.h3>
          <button className={styles.closeButton} onClick={handleClose}>
            Prosseguir
          </button>
        </div>
      )}
    </>
  );
}
