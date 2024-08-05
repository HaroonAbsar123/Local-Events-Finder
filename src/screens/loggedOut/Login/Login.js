import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useColorScheme } from "react-native";
import EmailAndPassword from "./EmailAndPassword";

export default function Login({navigation}) {
  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    scrollView: {
      flex: 1,
      width: "100%",
      height: '100%',
    },
    text: {
      color: colorScheme === "dark" ? "#fff" : "#1e1e1e",
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <EmailAndPassword navigation={navigation}/>
      </ScrollView>
    </View>
  );
}
