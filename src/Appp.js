import { NavigationContainer } from "@react-navigation/native";
import { Main } from "./navigations/Main";
import { Appearance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContextProvider } from "./context/AppContext";
import "./firebase";

export default function App() {
  Appearance.setColorScheme("light");

  return (
    <AppContextProvider>
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1}}>
        <Main
        />
      </SafeAreaView>
    </NavigationContainer>
    </AppContextProvider>
  );
}
