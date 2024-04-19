import { useEffect, useState } from "react";
import styles from "./components.module.css";
import { motion } from "framer-motion";
import { VscDebugRestart } from "react-icons/vsc";

export default function error() {
  const [showError, setShowError] = useState(true);

  const handleOrientationChange = () => {
    if (window.screen.orientation.type.includes("portrait")) {
      setShowError(true);
      document.getElementById("main")!.style.display = "none";
    } else {
      document.getElementById("main")!.style.display = "flex";
      setShowError(false);
    }
  };
  useEffect(() => {
    handleOrientationChange();

    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);
  return (
    <motion.div
      className={styles["error-container"]}
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: showError ? 0 : "-100%", opacity: showError ? 1 : 0 }}
      // transition={{ duration: 0 }}
    >
      {/* spin in circle */}
      <h1>Rotate Device</h1>

      <motion.div
        className={styles["error-icon"]}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <VscDebugRestart size={50} color="white" />
      </motion.div>
    </motion.div>
  );
}
