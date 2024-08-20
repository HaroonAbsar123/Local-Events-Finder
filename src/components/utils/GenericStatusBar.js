import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function GenericStatusBar() {
  const colorScheme = useColorScheme();

  return (
    <StatusBar
    style={"auto"}
    backgroundColor="transparent"
    />
  );
}
