import { StyleSheet,  View, ScrollView } from "react-native";
import { useColorScheme } from "react-native";
import EmailAndPassword from "./EmailAndPassword";
import usePallette from "../../../Pallette/Pallette";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register({navigation}) {
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
    <SafeAreaView style={{ flex: 1}}>
    <View style={pallette.screen}>
      <ScrollView style={styles.scrollView}>
        <EmailAndPassword navigation={navigation}/>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}
