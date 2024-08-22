import { NavigationContainer } from "@react-navigation/native";
import { Main } from "./navigations/Main";
import { AppContextProvider } from "./context/AppContext";
import "./firebase";
import GenericStatusBar from "./components/utils/GenericStatusBar";

export default function App() {
  return (
    <AppContextProvider>
      <GenericStatusBar />
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AppContextProvider>
  );
}
