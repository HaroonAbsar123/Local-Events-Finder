import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import usePallette from "../../../Pallette/Pallette";
import { AppContext } from "../../../context/AppContext";

export default function Map() {
  const { isOnline } = useContext(AppContext);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const pallette = usePallette();

  useEffect(() => {
    (async () => {
      if (!isOnline) {
        setErrorMsg("You are currently not connected to the internet.");
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [isOnline]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    map: {
      width: "100%",
      height: "100%",
    },
    message: {
      ...pallette.textColor,
      fontSize: 16,
      textAlign: "center",
      margin: 20,
    },
  });

  return (
    <View style={pallette.screen}>
      {!isOnline ? (
        <Text style={styles.message}>{errorMsg}</Text>
      ) : location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"You are here"}
          />
        </MapView>
      ) : (
        <ActivityIndicator size="large" color={"#ff8043"} />
      )}
    </View>
  );
}
