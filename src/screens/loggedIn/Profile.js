import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../Pallette/Pallette";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import DummyUser from "../../assets/dummyUser.png";
import { StatusBar } from "expo-status-bar";


export default function Profile({ navigation }) {
  const { userDetails } = useContext(AppContext);
  const colorScheme = useColorScheme();
  const pallette = usePallette();

  // ff8043

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    avatarContainer: {
      paddingTop: 50,
      paddingBottom: 50,
      backgroundColor: '#ff8043',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      elevation: 10,
      marginBottom: 20
    },
    name: {
      ...pallette.primaryHeading,
      color: '#fff',
      fontSize: 35
    }
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
        <StatusBar style={colorScheme} backgroundColor={"#ff8043"} />
      <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
              <View
                style={{
                  width: "100%",
                  alignItems: 'center',
                  marginBottom: 10
                }}
              >
                <Image
                  source={DummyUser}
                  alt="user"
                  style={{
                    borderRadius: 30,
                    objectFit: "contain",
                    height: 150,
                    width: 150,
                  }}
                />
              </View>
              <Text style={styles.name}>{userDetails?.name}</Text>
              <Text style={{ ...pallette.text, textAlign: "center", color: '#fff' }}>
                {userDetails?.email}
              </Text>
            </View>
      </ScrollView>
    </View>
  );
}
