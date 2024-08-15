import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function GenericStatusBar() {
  const colorScheme = useColorScheme();

  return (
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} backgroundColor={colorScheme === "dark" ? "#2e2e2e" : "#F8EDED"} />
  );
}
