import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function TertiaryButton({ title, onPress, loading, color, borderTopColor, borderTopWidth, borderRadius }) {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      borderTopColor: borderTopColor,
      borderTopWidth: borderTopWidth,
      overflow: "hidden",
    },
    pressable: {
      padding: 10,
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
