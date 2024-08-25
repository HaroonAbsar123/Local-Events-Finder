import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";

export default function GenericStatusBar() {
  const colorScheme = useColorScheme();

  useEffect(() => {
async function DefaultNavBarStyles(){
    NavigationBar.setButtonStyleAsync(colorScheme === "dark" ? "light" : "dark");
await NavigationBar.setBackgroundColorAsync(colorScheme === "dark" ? "#1e1e1e" : "#FFF")
}

DefaultNavBarStyles();
  }, [colorScheme])

  return (
    <>
    <StatusBar
    style={"auto"}
    backgroundColor="transparent"
    />
    </>
  );
}
