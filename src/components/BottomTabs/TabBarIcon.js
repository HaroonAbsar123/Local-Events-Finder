import React from "react";
import { useColorScheme } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';


export default function TabBarIcon(props) {
  let colorScheme = useColorScheme();

  return (
    <>
      {props.icon === "user" ? (
        <FontAwesome
          name={props.icon}
          style={{ marginBottom: -7 }}
          size={24}
          color={
            props.focused
              ? colorScheme === "dark"
                ? "#fff"
                : "#5e5e5e"
              : "rgb(143, 155, 179)"
          }
        />
      ) : (
        <Entypo
          name={props.icon}
          style={{ marginBottom: -7 }}
          size={24}
          color={
            props.focused
              ? colorScheme === "dark"
                ? "#fff"
                : "#5e5e5e"
              : "rgb(143, 155, 179)"
          }
        />
      )}
    </>
  );
}
