import config from "../../config";
import styles from "./dashboard.module.css";
import type { Game } from "../../types";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaHome } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { RiHome6Line, RiUserSettingsLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Motion } from "../../components";
import { FaR } from "react-icons/fa6";
import { GiCardRandom } from "react-icons/gi";

export default function Dashboard() {
  return (
    <Motion>
      <main className="layout">
        <Header />
        <div className={styles["heading"]}>
          {/* <div className={styles["icon"]}>
            <GiCardRandom size={48} color="white" opacity={0.7} />
          </div> */}
          <h1 className={styles["title"]}>Boardcards</h1>
          <p className={styles["subtitle"]}>
            Scorecards for your favorite board games.
          </p>
        </div>
        <motion.div
          className={styles["game-list"]}
          transition={{ staggerChildren: 0.5 }}
        >
          {config.games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </motion.div>
      </main>
    </Motion>
  );
}

function Header() {
  const navigate = useNavigate();
  return (
    <div className={styles["header"]}>
      <button className={styles["header-button"]}>
        <RiUserSettingsLine
          size={24}
          color="white"
          onClick={() => navigate("/players")}
        />
      </button>

      <button className={styles["header-button"]}>
        <FaRegHeart size={24} color="white" />
      </button>

      <button className={styles["header-button"]}>
        <IoSettingsOutline size={24} color="white" />
      </button>
    </div>
  );
}

function GameCard({
  id,
  title,
  description,
  icon: Icon,
  path,
  color,
  disabled,
}: Game) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorite((isFavorite) => !isFavorite);
  };

  const redirectToGame = () => {
    navigate(`/games${path}`);
  };

  return (
    <motion.div
      className={styles["game-card"]}
      initial={{ scale: 0.5, opacity: 0, y: 20 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: id * 0.1,
      }}
      viewport={{ once: true }}
    >
      <div
        className={styles["game-card-image"]}
        style={{
          backgroundColor: color,
        }}
      >
        {/* @ts-ignore */}
        <Icon size={90} />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className={styles["button-row"]}>
        <motion.button
          className={styles["play-button"]}
          whileHover={{ y: disabled ? 0 : -1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          animate={{ opacity: disabled ? 0.5 : 1 }}
          onClick={() => !disabled && redirectToGame()}
        >
          {disabled ? "Coming Soon" : "Play"}
        </motion.button>
        <motion.button
          className={styles["heart-button"]}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.5 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={toggleFavorite}
        >
          {isFavorite && <FaHeart color="#FF656D" size={22} />}
          {!isFavorite && <FaRegHeart color="#FF656D" size={22} />}
        </motion.button>
      </div>
    </motion.div>
  );
}
