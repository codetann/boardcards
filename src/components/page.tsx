import Modal from "./Modal";
import Bottomsheet from "./bottomsheet";

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
