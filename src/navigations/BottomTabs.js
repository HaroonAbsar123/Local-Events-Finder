import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, View, useColorScheme, Image } from "react-native";
import Profile from "../screens/loggedIn/Profile";
import Home from "../screens/loggedIn/Home";
import Events from "../screens/loggedIn/Events";
import TabBarIcon from "../components/BottomTabs/TabBarIcon";
import TabBarText from "../components/BottomTabs/TabBarText";
import Logo from "../assets/logoWhite.png";

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
        name="Events"
        component={Events}
        options={{
          tabBarLabel: () => null,
          tabBarButton: ({ onPress }) => (
            <CustomEventButton onPress={onPress} />
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

function CustomEventButton({ onPress }) {
  return (
    <View
      style={{
        backgroundColor: "#ff8043",
        height: 60,
        width: 60,
        borderRadius: 30,
        transform: "translateY(-20px)",
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#ffb795" }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Image
          source={Logo}
          alt=""
          style={{ width: 50, height: 50, objectFit: "contain" }}
        />
        {/* <Entypo name="location-pin" size={40} color={"#F8EDED"} /> */}
      </Pressable>
    </View>
  );
}
