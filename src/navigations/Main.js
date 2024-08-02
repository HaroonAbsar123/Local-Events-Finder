import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabs } from "./BottomTabs";
import Login from "../screens/loggedOut/Login/Login";
import Register from "../screens/loggedOut/Register/Register";

const MainStack = createNativeStackNavigator();

export const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
    <MainStack.Screen name="Login" component={Login} />
    <MainStack.Screen name="Register" component={Register} />
    <MainStack.Screen name="BottomTabs" component={BottomTabs} />
    </MainStack.Navigator>
  );
};
