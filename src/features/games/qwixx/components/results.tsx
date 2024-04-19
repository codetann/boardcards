import { useEffect, useState } from "react";
import { useQwixxStore } from "../qwixx.store";
import styles from "./results.module.css";
import { motion } from "framer-motion";

export default function results() {
  const store = useQwixxStore();

  const calculateScore = (total: number) => (total * (total + 1)) / 2;

  const red = calculateScore(store.red.length);
  const yellow = calculateScore(store.yellow.length);
  const green = calculateScore(store.green.length);
  const blue = calculateScore(store.blue.length);
  const penalties = store.penalty.filter((p) => p).length * -5;
  const total = red + yellow + green + blue + penalties;

  return (
    <>
      <motion.div
        className={styles["results-container"]}
        initial={{ opacity: 0 }}
        animate={{
          opacity: store.status === "results" ? 1 : 0,
          zIndex: store.status === "results" ? 2 : -1,
          y: store.status === "results" ? 0 : 100,
          x: "-50%",
          scale: store.status === "results" ? 0.9 : 0,
        }}
        exit={{ opacity: 0 }}
      >
        <button onClick={store.clear}>Restart</button>
        <h1>Results</h1>
        <div className={styles["results-row"]}>
          <div className={styles["results-column"]}>
            <h2>Red</h2>
            <p>{red}</p>
          </div>
          <div className={styles["results-column"]}>
            <h2>Yellow</h2>
            <p>{yellow}</p>
          </div>
          <div className={styles["results-column"]}>
            <h2>Green</h2>
            <p>{green}</p>
          </div>
          <div className={styles["results-column"]}>
            <h2>Blue</h2>
            <p>{blue}</p>
          </div>
          <div className={styles["results-column"]}>
            <h2>Penalties</h2>
            <p>{penalties}</p>
          </div>
          <div className={styles["results-column"]}>
            <h2>Total</h2>
            <p>{total}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={styles["results-overlay"]}
        initial={{ opacity: 0 }}
        animate={{
          opacity: store.status === "results" ? 1 : 0,
          zIndex: store.status === "results" ? 1 : -1,
        }}
        exit={{ opacity: 0 }}
      />
    </>
  );
}
