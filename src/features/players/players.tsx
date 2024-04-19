import React from "react";
import { Motion } from "../../components";
import styles from "./players.module.css";
import { FaPlus, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Players() {
  const navigate = useNavigate();

  return (
    <Motion>
      <main className="layout">
        <div className={styles["nav"]}>
          <button
            className={styles["nav-button"]}
            onClick={() => navigate("/")}
          >
            <FaChevronLeft size={20} color="white" />
          </button>
          <h1
            style={{
              color: "white",
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Players
          </h1>
        </div>
        <div className={styles["header"]}>
          <button className={styles["button"]}>
            <FaPlus size={20} color="white" />
          </button>
        </div>
        <p>Player list goes here...</p>
      </main>
    </Motion>
  );
}
