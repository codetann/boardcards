import { motion } from "framer-motion";
import { useQwixxStore } from "../qwixx.store";
import styles from "./components.module.css";
import { FaX } from "react-icons/fa6";
import { useModal } from "../../../../hooks";

export default function penalties() {
  const store = useQwixxStore();
  const modal = useModal();

  const handlePenaltyClick = (index: number) => {
    store.penalize(index);
  };

  return (
    <div className={styles["penalty-row"]}>
      <div className={styles["penalty-button-group"]}>
        {store.penalty.map((_, i) => (
          <motion.button
            key={i}
            className={styles["penalty-button"]}
            onClick={() => handlePenaltyClick(i)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              initial={{ scale: 0, y: 100, opacity: 0 }}
              animate={{
                scale: store.penalty[i] ? 1 : 0,
                y: 0,
                opacity: store.penalty[i] ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={styles["penalty-button-icon"]}
            >
              <FaX color="red" />
            </motion.div>
          </motion.button>
        ))}
        <button
          className={styles["finish-button"]}
          onClick={() => {
            modal.open({
              title: "Finish Game",
              message: "Are you sure you want to finish the game?",
              onConfirm: () => {
                store.finish();
                modal.close();
              },
            });
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
