import styles from "./components.module.css";
import { FiMenu, FiX } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { VscDebugRestart } from "react-icons/vsc";
import { IoMdExit } from "react-icons/io";
import { useQwixxStore } from "../qwixx.store";
import { useModal } from "../../../../hooks";

export default function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const store = useQwixxStore();
  const modal = useModal();

  useEffect(() => {
    const gameContainer = document.getElementById("game-container")!;
    if (isOpen) {
      document.body.style.overflow = "hidden";

      gameContainer!.style.opacity = ".5";
      gameContainer!.style.filter = "blur(5px)";
      gameContainer!.style.pointerEvents = "none";
      gameContainer.style.transform = "scale(0.97)";
    } else {
      document.body.style.overflow = "auto";
      gameContainer!.style.filter = "none";
      gameContainer!.style.pointerEvents = "auto";
      gameContainer!.style.opacity = "1";
      gameContainer.style.transform = "scale(1)";
    }

    document.addEventListener("click", onClickOutside);

    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [isOpen]);

  const onClickOutside = (e: MouseEvent) => {};

  const handleGameRestart = () => {
    modal.open({
      title: "Restart Game",
      message: "Are you sure you want to restart the game?",
      onConfirm: () => {
        store.clear();
        modal.close();
        setIsOpen(false);
      },
    });
  };

  return (
    <motion.div className={styles["menu"]} ref={ref}>
      <motion.div
        className={styles["menu-content"]}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 100, mass: 0.2 }}
      >
        <div className={styles["menu-header"]}>
          <button
            className={styles["menu-button"]}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <FiX color="white" size={28} />
          </button>
        </div>

        <h1>Qwixx</h1>
        <div className={styles["button-group"]}>
          <button
            className={styles["restart-button"]}
            onClick={handleGameRestart}
          >
            <VscDebugRestart size={20} />
            Restart game
          </button>
          <button
            className={styles["leave-button"]}
            onClick={() => navigate("/")}
          >
            <IoMdExit size={20} />
            Leave game
          </button>
        </div>
        {/* <p>
          Qwixx is a quick-playing dice game in which everyone participates, no
          matter whose turn it is. Each player has a scoresheet with the numbers
          2-12 in rows of red and yellow and the numbers 12-2 in rows of green
          and blue. To score points, a player must mark off as many numbers as
          possible, but they can mark off a number only if it is to the right of
          all marked-off numbers in the same row.
          </p>
          <p>
          The game ends if two rows have been locked or one player has marked
          off at least five numbers in each color. The player with the most
          points wins.
        </p> */}
        {/* <div className={styles["menu-overlay"]} /> */}
      </motion.div>
      <button
        className={styles["menu-button"]}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FiMenu color="white" size={28} />
      </button>
    </motion.div>
  );
}
