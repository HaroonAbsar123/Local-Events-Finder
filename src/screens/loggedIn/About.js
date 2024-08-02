import { StyleSheet, Text, View } from "react-native";
import { 
  useColorScheme
 } from "react-native";

export default function About() {

  let colorScheme = useColorScheme();

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
    <View style={styles.container}>
      <Text style={styles.text}>
        Open up About.js to start working on your app!
      </Text>
    </View>
  );
}
