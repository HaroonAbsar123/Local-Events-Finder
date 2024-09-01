import React, { useContext, useEffect, useState } from "react";
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
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { AppContext } from "../../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveIdsToDb } from "../../../sqlite/SyncSaved";
import { doc, getDoc } from "firebase/firestore";

export default function EmailAndPassword({ navigation }) {
  const { setSaved, setReminderTime } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const pallette = usePallette();

  async function signInHandler() {
    try {
      setLoading(true);
      setError(null);
      if (!email || !password) {
        setError(!email ? "Please enter email" : "Please enter password");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      AsyncStorage.setItem("userId", userId);

      const userDocRef = doc(db, "userList", userId);
      const userDoc = await getDoc(userDocRef);
      const savedFromFirestore = userDoc.exists()
        ? userDoc.data().saved || []
        : [];

      setSaved(savedFromFirestore);
      setReminderTime(userDoc.data()?.reminderTime);
      AsyncStorage.setItem("reminderTime", userDoc.data()?.reminderTime);

      navigation.replace("BottomTabs");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function forgotPassword() {
    if (email !== "") {
      try {
        await sendPasswordResetEmail(auth, email);
        alert(`Password reset email sent on ${email}`);
        setError(null);
      } catch (e) {
        console.error(e);
      }
    } else {
      setError("Please enter email");
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
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={"#9e9e9e"}
          />
        </View>

        {/* PASSWORD INPUT */}
        <View style={styles.formFieldContainer}>
          <Text style={pallette.formHeading}>Password</Text>
          <PasswordInput password={password} setPassword={setPassword} />
        </View>
      </View>

      <Pressable onPress={forgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title={loading ? "Signing In" : "Sign In"}
          onPress={signInHandler}
          loading={loading}
          color="#ff8043"
          borderRadius={30}
        />
      </View>

      <Pressable
        onPress={() => navigation.navigate("Register")}
        style={styles.navTextContainer}
      >
        <Text style={styles.otherText}>Don't have an account?</Text>
        <Text style={styles.navText}>Register</Text>
      </Pressable>
    </View>
  );
}
