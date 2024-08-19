import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import DummyImage from "../../../assets/event.jpg"
import AntDesign from '@expo/vector-icons/AntDesign';


export default function EventItem() {
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#5e5e5e" : "#fff",
      borderRadius: 10,
      elevation: 5
    },
    imageContainer: {
        height: 150,
        margin: 3,
        borderRadius: 7,
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
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 30,
        width: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        color: colorScheme === "dark" ? "#eee" : "#fff",
        flex: 1,
    }
  });

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={DummyImage} alt="" style={styles.image}/>
            <View style={styles.saveButton}>
        <Pressable>
            <AntDesign name="hearto" size={20} color={"#ff8043"} />
            </Pressable>
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
