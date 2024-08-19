import { StyleSheet, View, FlatList } from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import EventItem from "./EventItem";

export default function EventsList() {
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  const data = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
    { id: '11' },
    { id: '12' },
  ];

  const styles = StyleSheet.create({
    container: {
      margin: 20,
      marginTop: 0,
      paddingBottom: 30,
    },
    itemContainer: {
      flex: 1,
      margin: 3,
    },
  });

  const renderItem = () => (
    <View style={styles.itemContainer}>
      <EventItem />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
}
