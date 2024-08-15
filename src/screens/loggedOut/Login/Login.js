import { StyleSheet, View, ScrollView } from "react-native";
import { useColorScheme } from "react-native";
import EmailAndPassword from "./EmailAndPassword";
import usePallette from "../../../Pallette/Pallette";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import GenericStatusBar from "../../../components/utils/GenericStatusBar";

export default function Login({navigation}) {
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const value = await AsyncStorage.getItem("userId");
        if (value !== null) {
          navigation.replace("BottomTabs");
        }
      } catch (error) {
        console.error("Error retrieving userId from AsyncStorage:", error);
      }
    };

    fetchUserId();
  }, []);

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
    <GenericStatusBar />
      <ScrollView style={styles.scrollView}>
        <EmailAndPassword navigation={navigation}/>
      </ScrollView>
    </View>
  );
}
