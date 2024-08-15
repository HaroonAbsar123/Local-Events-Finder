import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native";
import GenericStatusBar from "../../components/utils/GenericStatusBar";
import usePallette from "../../Pallette/Pallette";

export default function Events() {
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
    <GenericStatusBar />
      <Text style={styles.text}>
        Open up Events.js to start working on your app!
      </Text>
    </View>
  );
}
