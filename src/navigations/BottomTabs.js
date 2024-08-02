import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import About from "../screens/loggedIn/About";
import Home from "../screens/loggedIn/Home";
import TabBarIcon from "../components/BottomTabs/TabBarIcon";
import TabBarText from "../components/BottomTabs/TabBarText";

const Tabs = createBottomTabNavigator();
export const BottomTabs = () => {

  let colorScheme = useColorScheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: colorScheme === "dark" ? "#1e1e1e" : "#c0c0c0",
          backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#ffffff",
        },
      }}
      initialRouteName="Home"
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="About" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"information-circle"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
