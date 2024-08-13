import { StyleSheet, View, ScrollView } from "react-native";
import { useColorScheme } from "react-native";
import EmailAndPassword from "./EmailAndPassword";
import usePallette from "../../../Pallette/Pallette";

export default function Login({navigation}) {
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  const styles = StyleSheet.create({
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
    <View style={pallette.screen}>
      <ScrollView style={styles.scrollView}>
        <EmailAndPassword navigation={navigation}/>
      </ScrollView>
    </View>
  );
}
