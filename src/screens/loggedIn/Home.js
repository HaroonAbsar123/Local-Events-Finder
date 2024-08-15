import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../Pallette/Pallette";

export default function Home() {
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: colorScheme === "dark" ? "#fff" : "#1e1e1e",
    },
  });

  return (
    <View style={pallette.screen}>
      <Text style={styles.text}>
        Open up Home.js to start working on your app!
      </Text>
    </View>
  );
}
