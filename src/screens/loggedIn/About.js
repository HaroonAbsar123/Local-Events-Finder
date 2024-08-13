import { StyleSheet, Text, View } from "react-native";
import { 
  useColorScheme
 } from "react-native";
import usePallette from "../../Pallette/Pallette";

export default function About() {

  const colorScheme = useColorScheme();
  const pallette = usePallette();

  const styles = StyleSheet.create({
    text: {
      color: colorScheme === "dark" ? "#fff" : "#1e1e1e",
    },
  });

  return (
    <View style={pallette.screen}>
      <Text style={styles.text}>
        Open up About.js to start working on your app!
      </Text>
    </View>
  );
}
