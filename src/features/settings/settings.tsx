import { FaChevronLeft } from "react-icons/fa6";
import { Page } from "../../components";
import { useNavigate } from "react-router-dom";
import styles from "./settings.module.css";
import { motion } from "framer-motion";
import { useQwixxStore } from "../games/qwixx/qwixx.store";
import { usePlayersStore } from "../../stores/players.store";
import { useModal } from "../../hooks";
import { useFavoritesStore } from "../../stores";

export default function Settings() {
  const navigate = useNavigate();
  const playersStore = usePlayersStore();
  const qwixxStore = useQwixxStore();
  const favoritesStore = useFavoritesStore();
  const modal = useModal();

  const handleReset = () => {
    playersStore.reset();
    qwixxStore.clear();
    favoritesStore.reset();
    modal.close();
  };

  const handleResetClick = () => {
    modal.open({
      title: "Reset app data",
      message: "Are you sure you want to reset all app data?",
      onConfirm: handleReset,
    });
  };
  return (
    <Page>
      <div className={styles["nav"]}>
        <button className={styles["nav-button"]} onClick={() => navigate("/")}>
          <FaChevronLeft size={20} color="white" />
        </button>
      </div>
      <motion.h1
        initial={{ scale: 0.5, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={styles["title"]}
        style={{
          color: "white",
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Settings
      </motion.h1>
      <motion.div
        className={styles["settings-row"]}
        initial={{ scale: 0.5, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <h2>Reset app data</h2>
        <p>Reset all app data and start fresh</p>
        <button className={styles["button"]} onClick={handleResetClick}>
          Reset
        </button>
      </motion.div>
    </Page>
  );
}
