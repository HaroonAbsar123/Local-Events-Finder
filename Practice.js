import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import EventsList from "./EventsList";
import Feather from "@expo/vector-icons/Feather";
import { useContext, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { AppContext } from "../../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, updateDoc } from "firebase/firestore";
import * as Notifications from "expo-notifications";
import { db } from "../../../firebase";

export default function Events({ navigation }) {
  const colorScheme = useColorScheme();
  const { eventsLoading, events, saved, loadEvents, userDetails } = useContext(AppContext);
  const pallette = usePallette();
  const { width } = Dimensions.get("window");
  const [filter, setFilter] = useState("all");
  const [searched, setSearched] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reminderTime, setReminderTime] = useState("");
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    setSavedEvents(events?.filter((item) => saved?.includes(item.id)));
  }, [saved, events]);

  useEffect(() => {
    loadReminderTime();
  }, []);

  useEffect(() => {
    checkAndSendNotifications();
  }, [savedEvents, reminderTime]);


  const loadReminderTime = async () => {
    try {
      const savedTime = await AsyncStorage.getItem("reminderTime");
      console.log("savedTime", savedTime)
      if (savedTime) {
        setReminderTime(savedTime);
      }
    } catch (error) {
      console.error("Failed to load reminder time from AsyncStorage", error);
    }
  };

  const saveReminderTime = async () => {
    try {
      await AsyncStorage.setItem("reminderTime", reminderTime);
      await updateDoc(doc(db, "userList", userDetails?.userId), {
        reminderTime,
      });
      Alert.alert("Success", "Reminder time saved successfully!");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to save reminder time", error);
      Alert.alert("Error", "Failed to save reminder time.");
    }
  };

  const checkAndSendNotifications = () => {
    if (!reminderTime) return;

    const timeParts = reminderTime.split(" ");
    const value = parseInt(timeParts[0]);
    const unit = timeParts[1]?.toLowerCase();

    savedEvents.forEach((item) => {
      const eventDate = new Date(item?.start?.local);
      let reminderDate;

      if (unit?.includes("hour") || unit?.includes("hours")) {
        reminderDate = new Date(eventDate.getTime() - value * 60 * 60 * 1000);
      } else if (unit?.includes("minute") || unit?.includes("minutes")) {
        reminderDate = new Date(eventDate.getTime() - value * 60 * 1000);
      } else if (unit?.includes("day") || unit?.includes("days")) {
        reminderDate = new Date(eventDate.getTime() - value * 24 * 60 * 60 * 1000);
      }

      if (new Date() >= reminderDate) {
        sendNotification(item);
      }
    });
  };

  const sendNotification = async (item) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Event Reminder",
        body: `Your event "${item.title}" is coming up soon!`,
        data: { eventId: item.id },
      },
      trigger: null,
    });
  };

  const handleFilterSelection = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsModalVisible(false);
  };

  const handleReminderTimeChange = (text) => {
    setReminderTime(text);
  };

  const handleSaveReminderTime = () => {
    if (!reminderTime) {
      Alert.alert("Error", "Please enter a valid reminder time.");
      return;
    }
    saveReminderTime();
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
    },
    reminderInput: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      width: "100%",
      marginTop: 10,
      marginBottom: 10,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    saveButton: {
      marginTop: 10,
      backgroundColor: "#ff8043",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    saveButtonText: {
      color: "#fff",
      fontSize: 16,
    },
  });

  return (
    <View style={pallette.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.scrollView}>
          <View style={styles.headingContainer}>
            <Text style={styles.topHeading}>
              {filter === "all" ? "Discover Events" : "Saved Events"}
            </Text>
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
              placeholder={
                filter === "all" ? "Search events" : "Search saved events"
              }
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
          {eventsLoading ? (
            <ActivityIndicator size="large" color={"#ff8043"} />
          ) : (
            <EventsList navigation={navigation} filter={filter} searched={searched} />
          )}
        </View>
      </SafeAreaView>

      {/* Modal for setting reminder time */}
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
            <Text style={styles.modalHeading}>Set Reminder Time</Text>
            <TextInput
              placeholder="e.g., 1 hour, 30 minutes, 2 days"
              style={styles.reminderInput}
              value={reminderTime}
              onChangeText={handleReminderTimeChange}
              placeholderTextColor={"#9e9e9e"}
            />
            <Pressable
              style={styles.saveButton}
              onPress={handleSaveReminderTime}
            >
              <Text style={styles.saveButtonText}>Save Reminder Time</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
