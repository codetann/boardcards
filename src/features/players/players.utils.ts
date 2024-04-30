const colors = [
  "gray",
  "primary",
  "error",
  "warning",
  "success",
  "blue-gray",
  "blue-light",
  "blue",
  "indigo",
  "purple",
  "pink",
  "rose",
  "orange",
];

export const selectRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
