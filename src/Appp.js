import { NavigationContainer } from "@react-navigation/native";
import { Main } from "./navigations/Main";
// import { Appearance } from "react-native";
import { AppContextProvider } from "./context/AppContext";
import "./firebase";
import GenericStatusBar from "./components/utils/GenericStatusBar";

export default function App() {
  // Appearance.setColorScheme("light");
  // Appearance.setColorScheme("dark");


  return (
    <AppContextProvider>
      <GenericStatusBar />
    <NavigationContainer>
        <Main />
    </NavigationContainer>
    </AppContextProvider>
  );
}
