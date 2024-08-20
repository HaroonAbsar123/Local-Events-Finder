import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import DummyImage from "../../../assets/event.jpg";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function EventItem({ item }) {
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#5e5e5e" : "#fff",
      borderRadius: 10,
      elevation: 2,
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
      borderRadius: 20,
      height: 40,
      width: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      elevation: 10,
    },
    textContainer: {
      flex: 1,
      margin: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 10,
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
    },
    timeContainer: {
      fontSize: 15,
      color: colorScheme === "dark" ? "#eee" : "#fff",
    },
  });

  function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", dateTimeStr);
      return null; // Return null or a default value in case of an invalid date
    }

    // Format time
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Format date
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Log the formatted date and time
    console.log("Formatted Date:", `${day} ${month}, ${year}`);
    console.log(
      "Formatted Time:",
      `${formattedHours}:${formattedMinutes} ${ampm}`
    );

    // Return the formatted date and time separately
    return {
      time: `${formattedHours}:${formattedMinutes} ${ampm}`,
      date: `${day} ${months[month - 1]}, ${year}`,
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={item?.logo?.url ? { uri: item?.logo?.url } : DummyImage}
          alt="Image Description"
          style={styles.image}
        />

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
            <AntDesign name="hearto" size={25} color={"#ff8043"} />
          </Pressable>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>{item?.name?.text}</Text>
          <Text style={styles.locationContainer}>
            {item?.description?.text?.slice(0, 60)}...
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={styles.timeContainer}>
            {formatDateTime(item?.start?.local)?.time}
          </Text>
          <Text style={styles.timeContainer}>
            {formatDateTime(item?.start?.local)?.date}
          </Text>
        </View>
      </View>
    </View>
  );
}
