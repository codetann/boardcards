export interface Player {
  id: number;
  name: string;
  color: string;
  score: number;
}

export interface Game {
  id: number;
  title: string;
  description: string;
  multiplayer: boolean;
  icon: React.ComponentType;
  color: string;
  path: string;
  disabled: boolean;
}
