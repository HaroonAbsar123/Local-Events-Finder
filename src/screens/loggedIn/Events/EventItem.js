import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import DummyImage from "../../../assets/event.jpg";
import Feather from "@expo/vector-icons/Feather";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function EventItem({ item, navigation }) {
  const { userDetails, saved, setSaved } = useContext(AppContext);
  const colorScheme = useColorScheme();
  const pallette = usePallette();
  const [savedItem, setSavedItem] = useState(false);

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
      fontSize: 18,
      fontWeight: "bold",
      color: "#ff8043",
    },
    locationContainer: {
      ...pallette.textColor,
      fontSize: 14,
    },
    timeContainer: {
      fontSize: 14,
      color: colorScheme === "dark" ? "#eee" : "#3e3e3e",
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

    // Return the formatted date and time separately
    return {
      time: `${formattedHours}:${formattedMinutes} ${ampm}`,
      date: `${day} ${months[month - 1]}, ${year}`,
    };
  }

  async function onSave() {
    try {
      setSavedItem(true);
      if(!saved.includes(item?.id)){
        setSaved(prev => [...prev, item?.id])
      }
      // const docRef = doc(db, "userList", userDetails?.userId);
      // await updateDoc(docRef, {
      //   saved: arrayUnion(item?.id),
      // });
    } catch (e) {
      console.error(e);
      setSavedItem(false);
    }
  }

  async function onUnsave() {
    try {
      setSavedItem(false);
      if(saved.includes(item?.id)){
        setSaved(saved.filter((e) => e !== item?.id))
      }
      // const docRef = doc(db, "userList", userDetails?.userId);
      // await updateDoc(docRef, {
      //   saved: arrayRemove(item?.id),
      // });
    } catch (e) {
      console.error(e);
      setSavedItem(true);
    }
  }

  useEffect(() => {
    if (saved?.length >= 0) {
      setSavedItem(saved?.includes(item?.id));
    }
  }, [saved]);



  return (
    <Pressable
      onPress={() => navigation.navigate("EventInfo", { item: item })}
      style={styles.container}
    >
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
            onPress={savedItem ? onUnsave : onSave}
          >
            {savedItem ? (
              <FontAwesome name="heart" size={25} color="#ff8043" />
            ) : (
              <Feather name="heart" size={25} color={"#ff8043"} />
            )}
          </Pressable>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>{item?.name?.text}</Text>
          <Text style={styles.locationContainer}>
  {item?.description?.text?.length > 60 
    ? `${item?.description?.text?.slice(0, 60)}...` 
    : item?.description?.text}
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
    </Pressable>
  );
}

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
