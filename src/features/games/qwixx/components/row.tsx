import { default as Item } from "./item";
import styles from "./components.module.css";
import { useQwixxStore } from "../qwixx.store";

interface RowProps {
  color: "red" | "yellow" | "green" | "blue";
}

const hexColors = {
  red: "#D93847",
  yellow: "#F9E467",
  green: "#419F5B",
  blue: "#394A8B",
};

export default function Row({ color }: RowProps) {
  const store = useQwixxStore();

  const handleItemClick = (value: number) => {
    const lastNumber = store[color][store[color].length - 1];
    const isSameNumber = lastNumber === value;

    if (isSameNumber) return store.remove(color, value);

    store.add(color, value);
  };

  const checkSelected = (value: number) => {
    return store.check(color, value);
  };

  const getItemValue = (value: number) => {
    if (color === "green" || color === "blue") {
      return 12 - value;
    }
    return value + 2;
  };

  return (
    <div
      className={styles["row"]}
      style={{
        backgroundColor: hexColors[color],
        borderBottomRightRadius: color === "blue" ? "1rem" : "0",
        borderBottomLeftRadius: color === "blue" ? "1rem" : "0",
        borderTopRightRadius: color === "red" ? "1rem" : "0",
        borderTopLeftRadius: color === "red" ? "1rem" : "0",

        // flexDirection:
        //   color === "red" || color === "yellow" ? "row" : "row-reverse",
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <Item
          key={i}
          color={color}
          value={getItemValue(i)}
          onItemClick={handleItemClick}
          isDisabled={store.checkDisabled(color, getItemValue(i))}
          isSelected={checkSelected(getItemValue(i))}
        />
      ))}

      <Item
        color={color}
        value={color === "green" || color === "blue" ? 2 : 12}
        onItemClick={handleItemClick}
        isDisabled={!(store[color].length >= 5) || checkSelected(0)}
        isSelected={checkSelected(
          color === "green" || color === "blue" ? 2 : 12
        )}
      />
      <Item
        color={color}
        value={0}
        onItemClick={handleItemClick}
        isDisabled={!(store[color].length >= 5)}
        isSelected={checkSelected(0)}
      />
    </div>
  );
}
