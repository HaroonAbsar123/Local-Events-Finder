import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import { Dimensions } from "react-native";
import DummyImage from "../../../assets/event.jpg"

export default function EventItem() {
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  const { width } = Dimensions.get("window");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 10,
      elevation: 10
    },
    imageContainer: {
        height: 150,
        margin: 5,
        borderRadius: 5,
        overflow: 'hidden',
        position: 'relative'
    },
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },
    saveButton: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    textContainer: {
        flex: 1,
        margin: 5,
    },
    title: {
        // ...pallette.textColor,
        fontSize: 20,
        fontWeight: 'bold',
        color: "#ff8043"
    },
    locationContainer: {
        ...pallette.textColor,
        fontSize: 15,
    },
    timeContainer: {
        fontSize: 15,
        color: "#8e8e8e",
        flex: 1,
    }
  });

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={DummyImage} alt="" style={styles.image}/>
            <View style={styles.saveButton}>
                <Button title={"Save"} />
            </View>
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.locationContainer}>Rawalpindi, Punjab</Text>
        <Text style={styles.timeContainer}>time</Text>
        </View>
    </View>
  );
}
