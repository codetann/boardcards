import { LuDices } from "react-icons/lu";
import { GiPirateFlag } from "react-icons/gi";

export default {
  title: "Board Games",
  games: [
    {
      id: 1,
      title: "Qwixx",
      description: "A two-player strategy board game.",
      multiplayer: false,
      icon: LuDices,
      // pastel blue
      color: "#AEE3E0",
      path: "/qwixx",
      disabled: false,
    },
    {
      id: 2,
      title: "Skull King",
      description: "A tile-placement game for two to five players.",
      multiplayer: true,
      icon: GiPirateFlag,
      // pastel red
      color: "#FFC6A5",
      path: "/skull-king",
      disabled: true,
    },
  ],
};
