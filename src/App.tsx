import "./styles/index.css";
import { useState } from "react";
import { Dashboard, Players } from "./features";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import { Routes } from "./routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
