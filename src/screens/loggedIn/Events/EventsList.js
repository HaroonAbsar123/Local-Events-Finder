import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import EventItem from "./EventItem";

export default function EventsList({navigation}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEventsHandler(){
      const response = await fetch('https://www.eventbriteapi.com/v3/organizations/1466912144973/events?token=NBTMWUACKFEOM2VLR6IJ');
      const data = await response.json();

      const sortedEvents = data.events.sort((a, b) => {
      const dateA = new Date(a.changed || a.created);
      const dateB = new Date(b.changed || b.created);
      return dateB - dateA;
    });

    setEvents(sortedEvents);
    }
    fetchEventsHandler();
  }, [])

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
    singleItemContainer: {
      flex: 0.5,
      margin: 3,
    }
  });

  const renderItem = ({item, index}) => {
    const isLastItemInRow = index === events.length - 1 && events.length % 2 !== 0;
    return(
      <View style={isLastItemInRow ? styles.singleItemContainer : styles.itemContainer}>
        <EventItem item={item} navigation={navigation}/>
      </View>
    )
  };

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={1}
      contentContainerStyle={styles.container}
    />
  );
}
