import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { useColorScheme } from "react-native";
import PasswordInput from "../../../components/utils/PasswordInput";
import PrimaryButton from "../../../components/utils/PrimaryButton";
import Logo from "../../../assets/logo.png";
import usePallette from "../../../Pallette/Pallette";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { AppContext } from "../../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EmailAndPassword({ navigation }) {
  const { setUserDetails } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const pallette = usePallette();

  async function signUpHandler() {
    try {
      setLoading(true);
      setError(null);
      if (!name || !email || !password || !confirmPassword) {
        if (!name) {
          setError("Please enter name");
        } else if (!email) {
          setError("Please enter email");
        } else if (!password) {
          setError("Please enter password");
        } else if (!confirmPassword) {
          setError("Please confirm password");
        }
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDocRef = doc(db, "userList", userCredential.user.uid);
      await setDoc(userDocRef, {
        name: name,
        email: email,
        userId: userCredential.user.uid,
      });
      setUserDetails({
        name,
        email,
        userId: userCredential.user.uid,
      });
      AsyncStorage.setItem("userId", userCredential.user.uid)
      navigation.replace("BottomTabs");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
    },
    imageContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      height: 50,
    },
    formContainer: {
      flex: 1,
      marginTop: 10,
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
      color: colorScheme === "dark" ? "#ccc" : "#6e6e6e",
    },
    buttonContainer: {
      padding: 20,
    },
    navTextContainer: {
      fontSize: 15,
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      gap: 5,
      flexDirection: "row",
      marginTop: 10,
      marginBottom: 30,
    },
    navText: {
      color: "#ff8043",
      fontSize: 15,
    },
    otherText: {
      color: colorScheme === "dark" ? "#fff" : "#5e5e5e",
      fontSize: 15,
    },
    error: {
      color: "red",
      paddingLeft: 20,
      paddingRight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={Logo}
          alt=""
          style={{ height: 80, objectFit: "contain" }}
        />
      </View>
      <Text style={pallette.primaryHeading}>Create Account</Text>
      <Text style={pallette.secondaryHeading}>Fill your information below</Text>

      <View style={styles.formContainer}>
        {/* NAME INPUT */}
        <View style={styles.formFieldContainer}>
          <Text style={pallette.formHeading}>Name</Text>
          <TextInput
            style={pallette.formInput}
            placeholder="John Doe"
            placeholderTextColor={"#9e9e9e"}
            id="name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        {/* EMAIL INPUT */}
        <View style={styles.formFieldContainer}>
          <Text style={pallette.formHeading}>Email</Text>
          <TextInput
            style={pallette.formInput}
            placeholder="example@gmail.com"
            value={email}
            placeholderTextColor={"#9e9e9e"}
            onChangeText={(text) => setEmail(text)}
            id="email"
            keyboardType="email-address"
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
          <PasswordInput
            password={confirmPassword}
            setPassword={setConfirmPassword}
          />
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.buttonContainer}>
        <PrimaryButton
          loading={loading}
          title={loading ? "Signing Up" : "Sign Up"}
          onPress={signUpHandler}
          color="#ff8043"
          borderRadius={30}
        />
      </View>

      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={styles.navTextContainer}
      >
        <Text style={styles.otherText}>Already have an account?</Text>
        <Text style={styles.navText}>Sign In</Text>
      </Pressable>
    </View>
  );
}
