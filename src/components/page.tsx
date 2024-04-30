import { useEffect } from "react";
import Modal from "./Modal";
import Bottomsheet from "./bottomsheet";
import { useBottomsheet, useModal } from "../hooks";

interface PageProps {
  children: React.ReactNode;
}

export default function page({ children }: PageProps) {
  return (
    <>
      <main
        id="main"
        className="layout"
        style={{
          transition: "all 0.2s",
        }}
      >
        {children}
      </main>
      <Modal />
      <Bottomsheet />
    </>
  );
}
