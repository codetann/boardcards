import { Dashboard, Players, Qwixx, Settings } from "../features";
import { AnimatePresence } from "framer-motion";
import { Routes as Router, Route, useLocation } from "react-router-dom";

export function Routes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Router location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/players" element={<Players />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/games/qwixx" element={<Qwixx />} />
      </Router>
    </AnimatePresence>
  );
}
