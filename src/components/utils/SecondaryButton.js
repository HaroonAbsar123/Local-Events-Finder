import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function SecondaryButton({ title, onPress, loading, color }) {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: color,
      borderRadius: 10,
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
      color: color,
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
