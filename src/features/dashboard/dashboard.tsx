import config from "../../config";
import styles from "./dashboard.module.css";
import type { GameCardProps } from "../../types";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components";
import { useFavoritesStore } from "../../stores";
import { RiUserSettingsLine } from "react-icons/ri";

export default function Dashboard() {
  const favoritesStore = useFavoritesStore();
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites((showFavorites) => !showFavorites);
  };

  return (
    <Page>
      <Header showFavorites={showFavorites} onShowFavorites={toggleFavorites} />
      <motion.div
        className={styles["heading"]}
        initial={{ scale: 0.5, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* <div className={styles["icon"]}>
            <GiCardRandom size={48} color="white" opacity={0.7} />
          </div> */}
        <motion.h1 className={styles["title"]}>Boardcards</motion.h1>
        <p className={styles["subtitle"]}>
          Scorecards for your favorite board games.
        </p>
      </motion.div>
      <motion.div
        className={styles["game-list"]}
        transition={{ staggerChildren: 0.5 }}
      >
        {config.games.map((game) => (
          <GameCard
            key={game.id}
            showFavorites={showFavorites}
            onToggleFavorite={() => {
              if (favoritesStore.isFavorite(game.id)) {
                favoritesStore.removeFavorite(game.id);
              } else {
                favoritesStore.addFavorite(game.id);
              }
            }}
            isFavorite={favoritesStore.isFavorite(game.id)}
            onNavigate={() => {}}
            {...game}
          />
        ))}
      </motion.div>
    </Page>
  );
}

function Header({ onShowFavorites, showFavorites }: any) {
  const navigate = useNavigate();
  return (
    <motion.div
      className={styles["header"]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <button className={styles["header-button"]}>
        <RiUserSettingsLine
          size={24}
          color="white"
          onClick={() => navigate("/players")}
        />
      </button>

      <button className={styles["header-button"]} onClick={onShowFavorites}>
        {showFavorites ? (
          <FaHeart size={24} color="#FF656D" />
        ) : (
          <FaRegHeart size={24} color="white" />
        )}
      </button>

      <button
        className={styles["header-button"]}
        onClick={() => navigate("/settings")}
      >
        <IoSettingsOutline size={24} color="white" />
      </button>
    </motion.div>
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
  isFavorite,
  onToggleFavorite,
  showFavorites,
}: GameCardProps) {
  const navigate = useNavigate();

  const redirectToGame = () => {
    navigate(`/games${path}`);
  };

  const checkIsVisible = () => {
    if (!showFavorites) return true;
    if (showFavorites && isFavorite) return true;
    return false;
  };

  if (!checkIsVisible()) return null;

  return (
    <motion.div
      className={styles["game-card"]}
      initial={{ scale: 0.5, opacity: 0, y: 20 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
      }}
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
          onClick={onToggleFavorite}
        >
          {isFavorite && <FaHeart color="#FF656D" size={22} />}
          {!isFavorite && <FaRegHeart color="#FF656D" size={22} />}
        </motion.button>
      </div>
    </motion.div>
  );
}
