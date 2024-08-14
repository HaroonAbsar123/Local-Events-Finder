import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Main } from "./navigations/Main";
import { Appearance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContextProvider } from "./context/AppContext";
import "./firebase";
import { NativeBaseProvider } from "native-base";

export default function App() {
  Appearance.setColorScheme("light");
  // Appearance.setColorScheme("dark");

  return (
    <NativeBaseProvider>
    <AppContextProvider>
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1}}>
        <StatusBar style={
          "dark"
          // colorScheme
          } />
        <Main
        />
      </SafeAreaView>
    </NavigationContainer>
    </AppContextProvider>
    </NativeBaseProvider>
  );
}
