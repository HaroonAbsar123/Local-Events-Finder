import { StyleSheet, Text, View, TextInput } from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Dimensions } from "react-native";
import EventsList from "./EventsList";

export default function Saved() {
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  const { width } = Dimensions.get("window");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff",
    },
    scrollView: {
      flex: 1,
      height: "100%",
      width: width,
      display: 'flex',
    },
    topHeading: {
      ...pallette.primaryHeading,
      marginTop: 20,
    },
    searchBar: {
      margin: 20,
      display: "flex",
      gap: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#fff",
      padding: 10,
      flexDirection: "row",
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: colorScheme === "dark" ? "transparent" : "#fff",
      elevation: 2
    },
    searchInput: {
      flex: 1,
      color: colorScheme === "dark" ? "#fff" : "#4e4e4e",
      fontSize: 15,
    },
  });

  return (
    <View style={pallette.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.scrollView}>
          <Text style={styles.topHeading}>Saved Events</Text>
          <View style={styles.searchBar}>
            <Feather name="search" size={24} color={"#9e9e9e"} />
            <TextInput
              placeholder="Search saved events"
              style={styles.searchInput}
              placeholderTextColor={"#9e9e9e"}
            />
          </View>
          <EventsList />
        </View>
      </SafeAreaView>
    </View>
  );
}
