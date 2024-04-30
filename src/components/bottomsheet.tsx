import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useBottomsheet } from "../hooks";

export default function Bottomsheet() {
  const ref = useRef<HTMLDivElement>(null);
  const bottomsheet = useBottomsheet();

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    if (bottomsheet.isOpen) {
      main!.style.overflow = "hidden";
      main!.style.opacity = ".5";
      main!.style.filter = "blur(5px)";
      main!.style.pointerEvents = "none";
      main!.style.transform = "scale(0.99)";
    } else {
      main!.style.overflow = "auto";
      main!.style.filter = "none";
      main!.style.pointerEvents = "auto";
      main!.style.opacity = "1";
      main!.style.transform = "scale(1)";
    }
  }, [bottomsheet.isOpen]);

  // handle outside click
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        bottomsheet.close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, bottomsheet]);

  return (
    <motion.div
      ref={ref}
      id="bottomsheet"
      initial={{ scale: 50, y: 50, opacity: 0 }}
      animate={{
        scale: bottomsheet.isOpen ? 1 : 0.95,
        zIndex: bottomsheet.isOpen ? 1 : -1,
        opacity: bottomsheet.isOpen ? 1 : 0,
        y: bottomsheet.isOpen ? 0 : "100%",
      }}
      transition={{ type: "spring", stiffness: 100, mass: 0.2 }}
      style={{
        position: "fixed",
        zIndex: 1,
        left: 0,
        bottom: 0,
        width: "100%",
        height: "auto",
        overflow: "auto",
        background: "#212121",
        borderTopRightRadius: "1rem",
        borderTopLeftRadius: "1rem",

        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {bottomsheet.html}
    </motion.div>
  );
}
