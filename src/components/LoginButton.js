"use client";

import { useState, useEffect } from "react";
import styles from "./LoginButton.module.css";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const router = useRouter()

  const handleClick = () => {
    router.push(`/signup`)
  };

  useEffect(() => {
    const moveButton = () => {
      const top = Math.random() * 80 + "%";
      const left = Math.random() * 80 + "%";
      setPosition({ top, left });
    };
    const intervalId = setInterval(moveButton, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={styles.loginSection}
      style={{ position: "relative", height: "200px", width: "200px" }}
    >
      <button
        className={styles.loginButton}
        style={{ position: "absolute", ...position }}
        onClick={handleClick}
      >
        Entrar
      </button>
    </div>
  );
}
