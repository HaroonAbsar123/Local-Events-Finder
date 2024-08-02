import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native";

function Pallette() {
  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
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
    }
  });

  return styles;
}

export default Pallette;
