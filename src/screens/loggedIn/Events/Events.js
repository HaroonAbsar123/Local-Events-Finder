import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import EventsList from "./EventsList";
import Feather from "@expo/vector-icons/Feather";
import { useContext, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { AppContext } from "../../../context/AppContext";

export default function Events({ navigation }) {
  const colorScheme = useColorScheme();
  const { eventsLoading } = useContext(AppContext);
  const pallette = usePallette();
  const { width } = Dimensions.get("window");
  const [filter, setFilter] = useState("all");
  const [searched, setSearched] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleFilterSelection = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsModalVisible(false);
  };

    

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff",
    },
    scrollView: {
      flex: 1,
      height: "100%",
      width: width,
      display: "flex",
    },
    headingContainer: {
      margin: 20,
      marginBottom: 0,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
      alignItems: "center",
    },
    topHeading: {
      ...pallette.primaryHeading,
      textAlign: "left",
      flex: 1,
    },
    filterButton: {
      borderRadius: 20,
      backgroundColor: colorScheme === "dark" ? "#fff" : "#4e4e4e",
      overflow: "hidden",
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
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      color: colorScheme === "dark" ? "#fff" : "#4e4e4e",
      fontSize: 15,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: colorScheme === "dark" ? "#4e4e4e" : "#fff",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      elevation: 10,
    },
    modalHeading: {
      ...pallette.textColor,
      fontWeight: "bold",
      textAlign: "left",
      width: "100%",
      fontSize: 20,
      marginBottom: 10,
    },
    modalButton: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      marginTop: 5,
      borderRadius: 5,
      backgroundColor: "transparent",
      width: "100%",
      alignItems: "center",
      borderColor: "#ff8043",
      borderWidth: 1,
    },
    modalButtonText: {
      fontSize: 16,
      ...pallette.textColor,
    }
  });

  return (
    <View style={pallette.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.scrollView}>
          <View style={styles.headingContainer}>
            <Text style={styles.topHeading}>{filter === "all" ? "Discover Events" : "Saved Events"}</Text>
            <View style={styles.filterButton}>
              <Pressable
                android_ripple={{ color: "#ccc" }}
                style={{ padding: 8 }}
                onPress={() => setIsModalVisible(true)}
              >
                <Feather
                  name="menu"
                  size={24}
                  color={colorScheme === "dark" ? "#4e4e4e" : "#fff"}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.searchBar}>
            <Feather name="search" size={24} color={"#9e9e9e"} />
            <TextInput
              placeholder={filter === "all" ? "Search events" : "Search saved events"}
              style={styles.searchInput}
              placeholderTextColor={"#9e9e9e"}
              value={searched}
              onChangeText={(text) => setSearched(text)}
            />
            {searched && (
              <Pressable onPress={() => setSearched("")}>
                <Entypo
                  name="cross"
                  size={24}
                  color={pallette.textColor.color}
                />
              </Pressable>
            )}
          </View>
          {
            eventsLoading ?
        <ActivityIndicator size="large" color={"#ff8043"} />
        :
        <EventsList
          navigation={navigation}
          filter={filter}
          searched={searched}
        />
          }
        </View>
      </SafeAreaView>

      {/* Modal for filter selection */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="fade"
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Filter Events</Text>
            <Pressable
              style={styles.modalButton}
              android_ripple={{
                color:
                  colorScheme === "dark"
                    ? "#5e5e5e"
                    : "rgba(255, 128, 67, 0.3)",
              }}
              onPress={() => handleFilterSelection("all")}
            >
              <Text style={styles.modalButtonText}>All Events</Text>
            </Pressable>
            

            <Pressable
              style={styles.modalButton}
              android_ripple={{
                color:
                  colorScheme === "dark"
                    ? "#5e5e5e"
                    : "rgba(255, 128, 67, 0.3)",
              }}
              onPress={() => handleFilterSelection("saved")}
            >
              <Text style={styles.modalButtonText}>Saved</Text>
            </Pressable>
            {/* <Pressable
              style={styles.cancelButton}
              android_ripple={{color: '#5e5e5e'}}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable> */}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
