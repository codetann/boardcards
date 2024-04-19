import { motion } from "framer-motion";
import { useEffect } from "react";
import { useModal } from "../hooks";
import styles from "./modal.module.css";
import { FaX } from "react-icons/fa6";

export default function Modal() {
  const modal = useModal();

  useEffect(() => {
    const main = document.getElementById("main");
    if (modal.isOpen) {
      main!.style.overflow = "hidden";
      main!.style.opacity = ".5";
      main!.style.filter = "blur(5px)";
      main!.style.pointerEvents = "none";
      main!.style.transform = "scale(0.99)";
    } else {
      main!.style.overflow = "auto";
      main!.style.filter = "none";
      main!.style.pointerEvents = "auto";
      main!.style.opacity = "1";
      main!.style.transform = "scale(1)";
    }
  }, [modal.isOpen]);

  return (
    <motion.div
      initial={{ scale: 50, y: 50, opacity: 0 }}
      animate={{
        scale: modal.isOpen ? 1 : 0.95,
        zIndex: modal.isOpen ? 1 : -1,
        opacity: modal.isOpen ? 1 : 0,
        y: modal.isOpen ? 0 : 50,
      }}
      transition={{ type: "spring", stiffness: 100, mass: 0.2 }}
      style={{
        position: "fixed",
        zIndex: 1,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",

        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--secondary-dark)",
          padding: "20px",
          borderRadius: ".5rem",
          width: "80%",
          maxWidth: "500px",
        }}
      >
        {/* <div className={styles["modal-header"]}>
          <button onClick={modal.close}>
            <FaX color="white" opacity={0.6} />
          </button>
        </div> */}
        <h2 className={styles["modal-title"]}>{modal.title}</h2>
        <p>{modal.message}</p>
        <div className={styles["modal-buttons"]}>
          <button
            className={styles["confirm-button"]}
            onClick={() => {
              modal.onConfirm!();
              modal.close();
            }}
          >
            Confirm
          </button>
          <button className={styles["close-button"]} onClick={modal.close}>
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
}
