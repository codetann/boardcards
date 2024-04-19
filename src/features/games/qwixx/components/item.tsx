import styles from "./components.module.css";
import { motion } from "framer-motion";
import { FaLock, FaUnlock } from "react-icons/fa";

interface ItemProps {
  color: "red" | "yellow" | "green" | "blue";
  value: number;
  onItemClick: (value: number) => void;
  isDisabled?: boolean;
  isSelected?: boolean;
}

const hexColors = {
  red: "#D93847",
  yellow: "#F9E467",
  green: "#419F5B",
  blue: "#394A8B",
};

export default function item({
  color,
  value,
  onItemClick,
  isDisabled,
  isSelected,
}: ItemProps) {
  const getLockIcon = () => {
    if (isDisabled || isSelected) return <FaLock />;
    return <FaUnlock />;
  };
  return (
    <motion.button
      onClick={() => {
        if (isDisabled) return;
        onItemClick(value);
      }}
      whileHover={{ y: -1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.96, boxShadow: "none" }}
      initial={{ scale: 0, y: 100, opacity: 0 }}
      animate={{
        scale: 1,
        y: 0,
        opacity: isDisabled && !isSelected ? 0.1 : 1,
        background: isSelected
          ? hexColors[color]
          : "rgba(255, 255, 255, 0.882)",
        color: isSelected ? "white" : hexColors[color],
        borderColor: isSelected ? "rgba(255, 255, 255, 0.765)" : "transparent",

        // transition: { delay: (value - 1) * 0.1 },
      }}
      transition={{
        duration: 0.15,
      }}
      className={styles["item"]}
      style={{
        color: hexColors[color],
        opacity: isDisabled ? 0.5 : 1,
        justifySelf: "flex-end",
      }}
    >
      {value === 0 ? getLockIcon() : value}
    </motion.button>
  );
}
