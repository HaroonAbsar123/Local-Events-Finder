import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  useColorScheme,
} from "react-native";
import usePallette from "../../../Pallette/Pallette";
import PrimaryButton from "../../../components/utils/PrimaryButton";
import DummyImage from "../../../assets/event.jpg"

export default function EventInfo({ navigation, route }) {
  const { item } = route.params;
  const colorScheme = useColorScheme();

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
    },
    infoContainer: {
      flex: 1,
      padding: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#ff8043",
      marginTop: 10
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
      marginTop: 0
    }
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

  function RenderItem({ title, value, border }) {
    return (
      <View style={{...styles.tableItem, borderBottomWidth: border ? 1 : 0}}>
        <Text style={pallette.textColor}>{title}</Text>
        <Text style={pallette.textColor}>{value}</Text>
      </View>
    );
  }

  return (
    <View style={pallette.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={item?.logo?.url ? { uri: item?.logo?.url } : DummyImage}
            alt="Image"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item?.name?.text}</Text>
          <Text style={styles.description}>{item?.description?.text}</Text>

          <View style={styles.detailsTable}>
            <RenderItem
              title={"Status"}
              value={item?.status}
              border={true}
            />
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
            <RenderItem
              title={"Capacity"}
              value={item?.capacity}
            />
          </View>

          <View style={styles.buttonContainer}>
        <PrimaryButton
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
