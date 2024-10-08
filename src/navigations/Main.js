import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabs } from "./BottomTabs";
import Login from "../screens/loggedOut/Login/Login";
import Register from "../screens/loggedOut/Register/Register";
import EventInfo from "../screens/loggedIn/EventInfo/EventInfo";
import { useColorScheme } from "react-native";
import Map from "../screens/loggedIn/Map/Map";
import OfflineBar from "../components/utils/OfflineBar";
import { AppContext } from "../context/AppContext";

const MainStack = createNativeStackNavigator();

export const Main = () => {
  const colorScheme = useColorScheme();
  const { onlineLoading, isOnline } = useContext(AppContext);

  return (
    <>
      {!onlineLoading && !isOnline && <OfflineBar />}
      <MainStack.Navigator>
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="BottomTabs"
          component={BottomTabs}
        />
        <MainStack.Screen
          name="EventInfo"
          component={EventInfo}
          options={{
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#2e2e2e" : "#F8EDED",
            },
            headerTintColor: colorScheme === "dark" ? "#fff" : "#4e4e4e",
            headerTitle: "Event Details",
          }}
        />
        <MainStack.Screen
          name="Map"
          component={Map}
          options={{
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#2e2e2e" : "#F8EDED",
            },
            headerTintColor: colorScheme === "dark" ? "#fff" : "#4e4e4e",
            headerTitle: "Event Location",
          }}
        />
      </MainStack.Navigator>
    </>
  );
};
