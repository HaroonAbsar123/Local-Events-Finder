import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../../firebase";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import DummyUser from "../../../assets/dummyUser.png";
import TertiaryButton from "../../../components/utils/TertiaryButton";
import { Appearance } from "react-native";

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
      paddingBottom: 30,
      backgroundColor: "#ff8043",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      elevation: 10,
    },
    name: {
      ...pallette.primaryHeading,
      color: "#fff",
      fontSize: 35,
    },
    actionsContainer: {
      backgroundColor: colorScheme === "dark" ? "#3e3e3e" : "#fff",
      margin: 30,
      padding: 10,
      borderRadius: 15,
      // elevation: 10,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: "#ff8043"
    },
  });

  async function logoutHandler() {
    await AsyncStorage.clear();
    auth.signOut();
    navigation.replace("Login");
  }

  return (
    <View style={pallette.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.avatarContainer}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                borderRadius: 75,
                objectFit: "contain",
                height: 120,
                width: 120,
                overflow: "hidden",
              }}
            >
              <Image
                source={DummyUser}
                alt="user"
                style={{
                  borderRadius: 75,
                  objectFit: "contain",
                  height: 120,
                  width: 120,
                }}
              />
            </View>
          </View>
          <Text style={styles.name}>{userDetails?.name}</Text>
          <Text
            style={{ ...pallette.text, textAlign: "center", color: "#fff", fontSize: 18 }}
          >
            {userDetails?.email}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <TertiaryButton
            title={colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
            onPress={() => Appearance.setColorScheme( colorScheme === "dark" ? "light" : "dark")}
            loading={false}
            color="#ff8043"
            borderRadius={5}
            borderTopColor={"transparent"}
            borderTopWidth={0}
          />
          <TertiaryButton
            title="Edit Profile"
            onPress={() => console.log("Pressed")}
            loading={false}
            color="#ff8043"
            borderRadius={5}
            borderTopColor={"#ff8043"}
            borderTopWidth={1}
          />
          {/* <TertiaryButton
            title="Saved"
            onPress={() => console.log("Pressed")}
            loading={false}
            color="#ff8043"
            borderRadius={5}
            borderTopColor={"#ff8043"}
            borderTopWidth={1}
          /> */}
          {/* <TertiaryButton
            title="Light Theme"
            onPress={() => Appearance.setColorScheme("light")}
            loading={false}
            color="#ff8043"
            borderRadius={5}
            borderTopColor={"#ff8043"}
            borderTopWidth={1}
          /> */}
          <TertiaryButton
            title="Logout"
            onPress={logoutHandler}
            loading={false}
            color="#ff8043"
            borderRadius={5}
            borderTopColor={"#ff8043"}
            borderTopWidth={1}
          />
        </View>
      </ScrollView>
    </View>
  );
}
