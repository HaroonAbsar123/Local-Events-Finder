import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  useColorScheme,
  Pressable,
} from "react-native";
import usePallette from "../../../Pallette/Pallette";
import PrimaryButton from "../../../components/utils/PrimaryButton";
import DummyImage from "../../../assets/event.jpg";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AppContext } from "../../../context/AppContext";
import { useContext, useEffect, useState } from "react";

export default function EventInfo({ navigation, route }) {
  const { item } = route.params;
  const { saved, setSaved } = useContext(AppContext);
  const colorScheme = useColorScheme();
  const [savedItem, setSavedItem] = useState(false);

  const pallette = usePallette();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      height: 200,
      width: "100%",
      position: "relative",
      overflow: "hidden",
    },
    saveButton: {
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: colorScheme === "dark" ? "#3e3e3e" : "#fff",
      borderRadius: 20,
      height: 50,
      width: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      elevation: 10,
      zIndex: 2,
    },
    infoContainer: {
      flex: 1,
      padding: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#ff8043",
      marginTop: 10,
    },
    description: {
      ...pallette.textColor,
      fontSize: 15,
      marginTop: 10,
      marginBottom: 10,
    },
    detailsTable: {
      backgroundColor: colorScheme === "dark" ? "#3e3e3e" : "#fff",
      margin: 20,
      padding: 10,
      borderRadius: 15,
      elevation: 3,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: "#ff8043",
    },
    tableItem: {
      flex: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: 10,
      borderBottomColor: "#ff8043",
      flexDirection: "row",
    },
    buttonContainer: {
      margin: 20,
      marginTop: 0,
    },
  });

  function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);

    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", dateTimeStr);
      return null;
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return {
      time: `${formattedHours}:${formattedMinutes} ${ampm}`,
      date: `${day} ${months[month - 1]}, ${year}`,
    };
  }

  function RenderItem({ title, value, border }) {
    return (
      <View style={{ ...styles.tableItem, borderBottomWidth: border ? 1 : 0 }}>
        <Text style={pallette.textColor}>{title}</Text>
        <Text style={pallette.textColor}>{value}</Text>
      </View>
    );
  }

  async function onSave() {
    try {
      setSavedItem(true);
      if (!saved.includes(item?.id)) {
        setSaved((prev) => [...prev, item?.id]);
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
      if (saved.includes(item?.id)) {
        setSaved(saved.filter((e) => e !== item?.id));
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
    <View style={pallette.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
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
                <Feather name="heart" size={27} color={"#ff8043"} />
              )}
            </Pressable>
          </View>

          <Image
            source={item?.logo?.url ? { uri: item?.logo?.url } : DummyImage}
            alt="Image"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item?.name?.text}</Text>
          <Text style={styles.description}>{item?.description?.text}</Text>

          <View style={styles.detailsTable}>
            <RenderItem title={"Status"} value={item?.status} border={true} />
            <RenderItem
              title={"Start Time"}
              value={formatDateTime(item?.start?.local)?.time}
              border={true}
            />
            <RenderItem
              title={"Start Date"}
              value={formatDateTime(item?.start?.local)?.date}
              border={true}
            />
            <RenderItem
              title={"End Time"}
              value={formatDateTime(item?.end?.local)?.time}
              border={true}
            />
            <RenderItem
              title={"End Date"}
              value={formatDateTime(item?.end?.local)?.date}
              border={true}
            />
            <RenderItem title={"Capacity"} value={item?.capacity} />
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => navigation.navigate("Map")}
              title={"View Location"}
              loading={false}
              color="#ff8043"
              borderRadius={30}
            />
          </View>
        </View>
      </ScrollView>
    </View>
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
