import React, { useState } from "react";
import { Modal, Motion, Page } from "../../components";
import styles from "./players.module.css";
import { FaPlus, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePlayersStore } from "../../stores/players.store";
import { GoPerson } from "react-icons/go";
import { FaX } from "react-icons/fa6";
import { useBottomsheet, useModal } from "../../hooks";
import { Player } from "../../types";
import * as utils from "./players.utils";

export default function Players() {
  const navigate = useNavigate();
  const store = usePlayersStore();
  const modal = useModal();
  const bottomsheet = useBottomsheet();

  const handleAddPlayer = () => {
    bottomsheet.open({
      html: <Bottomsheet />,
    });
    // store.addPlayer({
    //   name: "New Player",
    //   color: "info",
    // } as Player);
  };

  return (
    <>
      <Page>
        <motion.button
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={styles["button"]}
          onClick={handleAddPlayer}
        >
          <FaPlus size={20} color="white" opacity={1} />
        </motion.button>
        <div className={styles["nav"]}>
          <button
            className={styles["nav-button"]}
            onClick={() => navigate("/")}
          >
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
          Players
        </motion.h1>
        <motion.div
          className={styles["header"]}
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        ></motion.div>
        <motion.div
          className={styles["players-list"]}
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {store.players.map((player) => (
            <div key={player.id} className={styles["player"]}>
              <span
                className={styles["player-color"]}
                style={{ backgroundColor: `var(--${player.color}--300)` }}
              >
                <GoPerson size={24} />
              </span>
              <span className={styles["player-name"]}>{player.name}</span>
              <div className={styles["player-actions"]}>
                <button
                  className={styles["player-action"]}
                  onClick={() => {
                    modal.open({
                      title: "Remove Player",
                      message: `Are you sure you want to remove ${player.name}?`,
                      onConfirm: () => store.removePlayer(player.id),
                    });
                  }}
                >
                  <FaX size={16} color="rgba(249, 112, 102, 1)" opacity={0.6} />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </Page>
    </>
  );
}

function Bottomsheet() {
  const bottomsheet = useBottomsheet();
  const store = usePlayersStore();
  const [playerData, setPlayerData] = useState<Player>({
    name: "",
    color: "warning",
  } as Player);

  const handleAddPlayer = () => {
    store.addPlayer({
      name: playerData.name,
      color: utils.selectRandomColor(),
    } as Player);
    bottomsheet.close();
    resetData();
  };

  const resetData = () => {
    setPlayerData({
      name: "",
      color: "red",
    } as Player);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerData({
      ...playerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles["bottomsheet-container"]}>
      <h2>Add player</h2>
      <input
        type="text"
        name="name"
        className={styles["bottomsheet-input"]}
        value={playerData.name}
        onChange={handleInputChange}
        placeholder="Player Name"
      />
      <button
        className={styles["bottomsheet-button"]}
        onClick={handleAddPlayer}
      >
        Add Player
      </button>
    </div>
  );
}
