import { NavigationContainer } from "@react-navigation/native";
import { Main } from "./navigations/Main";
import { Appearance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContextProvider } from "./context/AppContext";
import "./firebase";
import GenericStatusBar from "./components/utils/GenericStatusBar";

export default function App() {
  // Appearance.setColorScheme("light");
  Appearance.setColorScheme("dark");


  return (
    <AppContextProvider>
      <GenericStatusBar />
    <NavigationContainer>
      {/* <SafeAreaView style={{ flex: 1}}> */}
        <Main />
      {/* </SafeAreaView> */}
    </NavigationContainer>
    </AppContextProvider>
  );
}
