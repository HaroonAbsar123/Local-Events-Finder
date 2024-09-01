import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import TabBarIcon from "../components/BottomTabs/TabBarIcon";
import TabBarText from "../components/BottomTabs/TabBarText";
import Profile from "../screens/loggedIn/Profile/Profile";
import Events from "../screens/loggedIn/Events/Events";

const Tabs = createBottomTabNavigator();

export const BottomTabs = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: colorScheme === "dark" ? "#1e1e1e" : "#c0c0c0",
          backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#ffffff",
        },
      }}
      initialRouteName="Events"
    >
      <Tabs.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Events" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"find"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Profile" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"user"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

