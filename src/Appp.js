import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Main } from "./navigations/Main";
import { Appearance, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  Appearance.setColorScheme("light");
  // Appearance.setColorScheme("dark");
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1}}>
        <StatusBar style={colorScheme} />
        <Main
        />
      </SafeAreaView>
    </NavigationContainer>
  );
}
