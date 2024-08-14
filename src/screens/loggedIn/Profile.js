import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../Pallette/Pallette";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Avatar } from "native-base";

export default function Profile({ navigation }) {
  const { userDetails } = useContext(AppContext);
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ff8043",
      width: "100%",
    },
    secondContainer: {
      backgroundColor: colorScheme === "dark" ? "#2e2e2e" : "#F8EDED",
      marginTop: 80,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      height: 1000,
      elevation: 100,
    },
    secondInnerContainer: {
      flex: 1,
      transform: "translateY(-100px)",
    },
    avatarContainer: {
      marginTop: 50,
      marginBottom: 30,
    },
  });

  async function logoutHandler() {
    await AsyncStorage.clear();
    auth.signOut();
    navigation.replace("Login");
  }

  const fetchUserId = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        console.log("userId", value);
      } else {
        console.log("No Value");
      }
    } catch (error) {
      console.error("Error retrieving userId from AsyncStorage:", error);
    }
  };

  return (
    <View style={pallette.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.secondInnerContainer}>
            <View style={styles.avatarContainer}>
              <Avatar
                style={{ elevation: 15 }}
                bg="#1e1e1e"
                alignSelf="center"
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              >
                AJ
              </Avatar>
              <Text style={pallette.primaryHeading}>{userDetails?.name}</Text>
              <Text style={{ ...pallette.text, textAlign: "center" }}>
                {userDetails?.email}
              </Text>
            </View>

            <Button onPress={logoutHandler} title="LogOut" />

            <Button onPress={fetchUserId} title="FetchId" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
