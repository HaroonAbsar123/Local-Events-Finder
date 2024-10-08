import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function PrimaryButton({ title, onPress, loading, color, borderRadius }) {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: color,
      borderRadius: borderRadius,
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
        android_ripple={{ color: "rgba(255,255,255,0.3)" }}
        style={styles.pressable}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}
