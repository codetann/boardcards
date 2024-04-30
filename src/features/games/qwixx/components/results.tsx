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
        <h1>Results</h1>
        <div className={styles["results-column"]}>
          <div
            className={styles["result-row"]}
            style={{
              backgroundColor: "#D93847",
              borderTopRightRadius: "1rem",
              borderTopLeftRadius: "1rem",
              color: "white",
            }}
          >
            <p>
              Red{" "}
              <i
                style={{
                  opacity: 0.4,
                  paddingLeft: ".2rem",
                  fontWeight: 400,
                  fontSize: ".9rem",
                }}
              >
                x{store.red.length}
              </i>
            </p>
            <p>{red}</p>
          </div>
          <div
            className={styles["result-row"]}
            style={{
              backgroundColor: "#F9E467",
              color: "white",
            }}
          >
            <p>
              Yellow{" "}
              <i
                style={{
                  opacity: 0.4,
                  paddingLeft: ".2rem",
                  fontWeight: 400,
                  fontSize: ".9rem",
                }}
              >
                x{store.yellow.length}
              </i>
            </p>
            <p>{yellow}</p>
          </div>
          <div
            className={styles["result-row"]}
            style={{
              backgroundColor: "#419F5B",
              color: "white",
            }}
          >
            <p>
              Green{" "}
              <i
                style={{
                  opacity: 0.4,
                  paddingLeft: ".2rem",
                  fontWeight: 400,
                  fontSize: ".9rem",
                }}
              >
                x{store.green.length}
              </i>
            </p>
            <p>{green}</p>
          </div>
          <div
            className={styles["result-row"]}
            style={{
              backgroundColor: "#394A8B",
              borderBottomRightRadius: "1rem",
              borderBottomLeftRadius: "1rem",
              color: "white",
            }}
          >
            <p>
              Blue{" "}
              <i
                style={{
                  opacity: 0.4,
                  paddingLeft: ".2rem",
                  fontWeight: 400,
                  fontSize: ".9rem",
                }}
              >
                x{store.blue.length}
              </i>
            </p>
            <p>{blue}</p>
          </div>
          <div className={styles["result-row"]}>
            <p>
              Penalties{" "}
              <i
                style={{
                  opacity: 0.4,
                  paddingLeft: ".2rem",
                  fontWeight: 400,
                  fontSize: ".9rem",
                }}
              >
                x{store.penalty.filter((p) => p).length}
              </i>
            </p>
            <p>{penalties}</p>
          </div>
          <div
            className={styles["result-row"]}
            style={{
              borderTop: "1px solid #b7b7bb59",
            }}
          >
            <p>Total</p>
            <p>{total}</p>
          </div>
          <button className={styles["button"]} onClick={store.clear}>
            Restart
          </button>
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
