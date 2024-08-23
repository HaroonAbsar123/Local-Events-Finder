import { NavigationContainer } from "@react-navigation/native";
import { Main } from "./navigations/Main";
import { AppContextProvider } from "./context/AppContext";
import "./firebase";
import GenericStatusBar from "./components/utils/GenericStatusBar";
// import EventNotifier from "./components/utils/EventNotifier";

export default function App() {
  return (
    <AppContextProvider>
      <GenericStatusBar />
      {/* <EventNotifier /> */}
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AppContextProvider>
  );
}

