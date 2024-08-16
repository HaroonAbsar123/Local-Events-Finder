import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native";

function usePallette() {
  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#2e2e2e" : "#F8EDED",
      alignItems: "center",
      justifyContent: "center",
    },
    primaryHeading: {
      color: colorScheme === "dark" ? "#fff" : "#4e4e4e",
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
    },
    secondaryHeading: {
      color: colorScheme === "dark" ? "#eee" : "#6e6e6e",
      textAlign: "center",
      marginTop: 10,
      fontSize: 15,
    },
    text: {
      color: colorScheme === "dark" ? "#eee" : "#6e6e6e",
      fontSize: 15
    },
    formHeading: {
      color: colorScheme === "dark" ? "#fff" : "#4e4e4e",
      fontSize: 15,
      fontWeight: "bold",
    },
    formInput: {
      color: colorScheme === "dark" ? "#fff" : "#4e4e4e",
      fontSize: 15,
      padding: 10,
      borderWidth: 1,
      borderColor: "#9e9e9e",
      borderRadius: 5
    },
    textColor: {
      color: colorScheme === "dark" ? "#eee" : "#6e6e6e",
    }
  });

  return styles;
}

export default usePallette;
