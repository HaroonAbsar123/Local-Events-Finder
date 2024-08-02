import React from "react";
import { Text } from "react-native";
import { 
  useColorScheme
 } from "react-native";

export default function TabBarText(props){
  let colorScheme = useColorScheme();
  return (
    <Text
      fontWeight="bold"
      style={{
        marginBottom: 5,
        color: props.focused
          ? colorScheme==="dark"
            ? "#fff"
            : "#1e1e1e"
          : "rgb(143, 155, 179)",
        fontSize: 10,
      }}
    >
      {props.title}
    </Text>
  );
};
