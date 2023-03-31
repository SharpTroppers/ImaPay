import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./style.module.css";

export function StarWarsOpening() {
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
      <div className="star-wars-message-container">
        {showOpening && (
          <div className="containerStar">
            <animated.h1 className="slide title" style={slide}>
              A long time ago in a galaxy far, far away...
            </animated.h1>
            <animated.h2 className="slide subtitle" style={slide}>
              Episode IV
            </animated.h2>
            <animated.h3 className="slide subtitle" style={slide}>
              A New Hope
            </animated.h3>
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
}
