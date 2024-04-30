export interface Player {
  id: number;
  name: string;
  color: string;
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

export interface GameCardProps extends Game {
  showFavorites: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onNavigate: () => void;
}
