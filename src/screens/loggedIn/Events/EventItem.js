import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import DummyImage from "../../../assets/event.jpg";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function EventItem({ item }) {
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#5e5e5e" : "#fff",
      borderRadius: 10,
      elevation: 5,
    },
    imageContainer: {
      height: 150,
      margin: 3,
      borderRadius: 7,
      overflow: "hidden",
      position: "relative",
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    saveButton: {
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: "#fff",
      borderRadius: 15,
      height: 30,
      width: 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    textContainer: {
      flex: 1,
      margin: 5,
    },
    title: {
      // ...pallette.textColor,
      fontSize: 20,
      fontWeight: "bold",
      color: "#ff8043",
    },
    locationContainer: {
      ...pallette.textColor,
      fontSize: 15,
      marginTop: 10,
      marginBottom: 10
    },
    timeContainer: {
      fontSize: 15,
      color: colorScheme === "dark" ? "#eee" : "#fff",
      flex: 1,
    },
  });

  function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${formattedHours}:${formattedMinutes} ${ampm} | ${day} ${month}, ${year}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={DummyImage} alt="" style={styles.image} />
        <View style={styles.saveButton}>
          <Pressable
            android_ripple={{ color: "#ff8043" }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="hearto" size={20} color={"#ff8043"} />
          </Pressable>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item?.name?.text}</Text>
        <Text style={styles.locationContainer}>{item?.description?.text?.slice(0, 30)}...</Text>
        <Text style={styles.timeContainer}>
          {formatDateTime(item?.start?.local)}
        </Text>
      </View>
    </View>
  );
}
