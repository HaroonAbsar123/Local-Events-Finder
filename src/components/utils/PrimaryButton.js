import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useColorScheme } from "react-native";

export default function PrimaryButton({ title, onPress, loading }) {
  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ff8043",
      borderRadius: 30,
      overflow: "hidden",
    },
    pressable: {
      padding: 15,
      flex: 1,
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    text: {
      textAlign: "center",
      color: "#fff",
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        disabled={loading}
        onPress={onPress}
        android_ripple={{ color: "#ffb795" }}
        style={styles.pressable}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}
