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
      <Text style={pallette.primaryHeading}>Create Account</Text>
      <Text style={pallette.secondaryHeading}>
        Fill your information below
      </Text>

      <View style={styles.formContainer}>
        
      {/* NAME INPUT */}
      <View style={styles.formFieldContainer}>
          <Text style={pallette.formHeading}>Name</Text>
          <TextInput
            style={pallette.formInput}
            placeholder="John Doe"
            placeholderTextColor={colorScheme === "dark" ? "#9e9e9e" : "#4e4e4e"}
          />
        </View>

      {/* EMAIL INPUT */}
        <View style={styles.formFieldContainer}>
          <Text style={pallette.formHeading}>Email</Text>
          <TextInput
            style={pallette.formInput}
            placeholder="example@gmail.com"
            value={email}
            placeholderTextColor={colorScheme === "dark" ? "#9e9e9e" : "#4e4e4e"}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* PASSWORD INPUT */}
        <View style={styles.formFieldContainer}>
          <Text style={pallette.formHeading}>Password</Text>
          <PasswordInput password={password} setPassword={setPassword} />
        </View>
      
        {/* PASSWORD INPUT */}
        <View style={styles.formFieldContainer}>
          <Text style={pallette.formHeading}>Confirm Password</Text>
          <PasswordInput password={password} setPassword={setPassword} />
        </View>
      </View>


        <View style={styles.buttonContainer}>
            <PrimaryButton title={"Sign Up"} onPress={() => console.log("Pressed!")} />
        </View>

    <Pressable 
    onPress={() => navigation.navigate('Login')} 
    style={styles.navTextContainer}>
        <Text style={styles.otherText}>Already have an account?</Text>
        <Text style={styles.navText}>Sign In</Text>
        </Pressable>

    </View>
  );
}
