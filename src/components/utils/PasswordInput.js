import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useColorScheme } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export default function PasswordInput({ password, setPassword }) {
  const [securePassword, setSecurePassword] = useState(true);

  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      gap: 10,
      padding: 10,
      borderRadius: 5,
      borderColor: "#9e9e9e",
      borderWidth: 1,
    },
    textInput: {
      color: colorScheme === "dark" ? "#fff" : "#1e1e1e",
      flex: 1,
      fontSize: 15,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={password}
        style={styles.textInput}
        placeholder="******"
        secureTextEntry={securePassword}
        onChangeText={(text) => setPassword(text)}
      />
      <Entypo
        name={securePassword ? "eye" : "eye-with-line"}
        size={24}
        color="black"
        onPress={() => setSecurePassword((prev) => !prev)}
      />
    </View>
  );
}
