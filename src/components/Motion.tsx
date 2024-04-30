import { motion } from "framer-motion";

interface Props {
  children: any;
}
export default function Motion({ children }: Props) {
  return (
    <motion.div
      id="main"
      initial={{ scale: 0.5, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.5, opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
