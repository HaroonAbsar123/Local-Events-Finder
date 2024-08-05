import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import PasswordInput from "../../../components/utils/PasswordInput";
import PrimaryButton from "../../../components/utils/PrimaryButton";
import Pallette from "../../../Pallette/Pallette";

export default function EmailAndPassword({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let colorScheme = useColorScheme();
  const pallette = Pallette();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
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
    },
    navTextContainer: {
      fontSize: 15,
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: 5,
      flexDirection: 'row',
      marginTop: 15,
      marginBottom: 20
    },
    navText: {
      color: "#ff8043",
    },
    otherText: {
      color: colorScheme === "dark" ? "#fff" : "#5e5e5e"
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
            placeholderTextColor={colorScheme === "dark" ? "#9e9e9e" : "#4e4e4e"}
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

    <Pressable 
    onPress={() => navigation.navigate('Register')} 
    style={styles.navTextContainer}>
        <Text style={styles.otherText}>Don't have an account?</Text>
        <Text style={styles.navText}>Register</Text>
        </Pressable>

    </View>
  );
}
