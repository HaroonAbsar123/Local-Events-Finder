import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import PasswordInput from "../../../components/utils/PasswordInput";
import PrimaryButton from "../../../components/utils/PrimaryButton";
import Pallette from "../../../Pallette/Pallette";

export default function EmailAndPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let colorScheme = useColorScheme();
  const pallette = Pallette();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 100,
      marginBottom: 20
    },
    formContainer: {
      flex: 1,
      marginTop: 30,
      padding: 20,
    },
    formFieldContainer: {
      flex: 1,
      flexDirection: "column",
      gap: 5,
      marginTop: 15,
    },
    forgotPassword: {
        flex: 1,
        padding: 20,
        textAlign: "right",
        fontSize: 15,
        fontWeight: "bold",
        textDecorationLine: "underline",
        paddingTop: 0,
        color: colorScheme === "dark" ? "#ddd" : "#6e6e6e"
    },
    buttonContainer: {
        padding: 20
    }
  });


  return (
    <View style={styles.container}>
      <Text style={pallette.primaryHeading}>Sign In</Text>
      <Text style={pallette.secondaryHeading}>
        Hi! Welcome back, you've been missed
      </Text>

      <View style={styles.formContainer}>
      {/* EMAIL INPUT */}
        <View style={styles.formFieldContainer}>
          <Text style={pallette.formHeading}>Email</Text>
          <TextInput
            style={pallette.formInput}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* PASSWORD INPUT */}
        <View style={styles.formFieldContainer}>
          <Text style={pallette.formHeading}>Password</Text>
          <PasswordInput password={password} setPassword={setPassword} />
        </View>
      </View>

      <Text style={styles.forgotPassword}>Forgot Password?</Text>

        <View style={styles.buttonContainer}>
            <PrimaryButton title={"Sign In"} onPress={() => console.log("Pressed!")} />
        </View>

    </View>
  );
}
