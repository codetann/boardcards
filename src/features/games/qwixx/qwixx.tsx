import { motion } from "framer-motion";
import { Modal } from "../../../components";
import { useOnMount } from "../../../hooks";
import { Row, Menu, Penalties, Error, Results } from "./components";
import "./qwixx.module.css";
import styles from "./qwixx.module.css";
import { useQwixxStore } from "./qwixx.store";

export default function Qwixx() {
  const store = useQwixxStore();
  useOnMount(() => {
    // store.clear();

    screen.orientation.lock("landscape-primary");
  });

  return (
    <>
      <main id="main" className={styles["container"]}>
        <Menu />
        <motion.div
          className={styles["game-container"]}
          id="game-container"
          initial={{ opacity: store.status !== "results" ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Row color="red" />
          <Row color="yellow" />
          <Row color="green" />
          <Row color="blue" />
          <Penalties />
        </motion.div>
      </main>
      <Error />
      <Modal />
      <Results />
    </>
  );
}
