import React from "react";
import { useColorScheme } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';


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
                : "#ff8043"
              : "rgb(143, 155, 179)"
          }
        />
      ) : (
        <AntDesign
          name={props.icon}
          style={{ marginBottom: -7 }}
          size={24}
          color={
            props.focused
              ? colorScheme === "dark"
                ? "#fff"
                : "#ff8043"
              : "rgb(143, 155, 179)"
          }
        />
      )}
    </>
  );
}
