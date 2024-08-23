import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, ActivityIndicator } from "react-native";
import EventItem from "./EventItem";
import { AppContext } from "../../../context/AppContext";

export default function EventsList({ navigation, filter, searched }) {
  const { events, saved, loadEvents } = useContext(AppContext);
  const [currentData, setCurrentData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let filteredEvents = events;

    if (filter === "saved") {
      filteredEvents = events.filter((event) => saved.includes(event.id));
    }

    if (searched) {
      filteredEvents = filteredEvents.filter((event) =>
        event?.name?.text?.toLowerCase().includes(searched.toLowerCase())
      );
    }

    setCurrentData(
      filteredEvents?.length > 0
        ? filteredEvents.sort(
            (a, b) =>
              new Date(b.changed || b.created) -
              new Date(a.changed || a.created)
          )
        : []
    );
  }, [events, filter, searched, saved]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadEvents(); // Execute the loadEvents function
    setRefreshing(false);
  };

  const renderItem = ({ item, index }) => {
    const isLastItemInRow =
      index === currentData.length - 1 && currentData.length % 2 !== 0;
    return (
      <View
        style={
          isLastItemInRow ? styles.singleItemContainer : styles.itemContainer
        }
      >
        <EventItem item={item} navigation={navigation} />
      </View>
    );
  };

  if (currentData?.length === 0) {
    return (
      <Text style={styles.noEventsText}>
        {filter === "saved"
          ? (
            searched ?.length > 0 ?
            "No such events"
            :
            "No saved events"
          )
          : searched?.length > 0
          ? "No such events"
          : "No events available"}
      </Text>
    );
  }

  return (
    <FlatList
      data={currentData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={1}
      contentContainerStyle={styles.container}
      refreshing={refreshing}
      onRefresh={handleRefresh} // Set the refresh handler
    />
  );
}

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
  },
  noEventsText: {
    color: "#9e9e9e",
    fontSize: 18,
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
  },
});
