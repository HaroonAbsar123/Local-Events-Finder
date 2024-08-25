import { NavigationContainer } from "@react-navigation/native";
import { Main } from "./navigations/Main";
import { AppContextProvider } from "./context/AppContext";
import "./firebase";
import GenericStatusBar from "./components/utils/GenericStatusBar";
import messaging from "@react-native-firebase/messaging";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import LocalNotificationHandler from "./components/utils/LocalNotificationHandler";

export default function App() {

  const [token, setToken] = useState(null)


  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization Status", authStatus);
    }
  };

  useEffect(() => {

    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          setToken(token)
          // console.log("token", token);
        });
    } else {
      console.log("Permission not granted");
    }

    // Check whether initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    // Assume a message-notification contains a "type" property in the data payload of screen to open.
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <AppContextProvider fcmToken={token}>
      <LocalNotificationHandler />
      <GenericStatusBar />
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AppContextProvider>
  );
}
