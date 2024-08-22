import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useColorScheme } from "react-native";
import usePallette from "../../../Pallette/Pallette";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db, storage } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AppContext } from "../../../context/AppContext";
import DummyUser from "../../../assets/dummyUser.png";
import TertiaryButton from "../../../components/utils/TertiaryButton";
import { Appearance } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Profile({ navigation }) {
  const { userDetails, isOnline } = useContext(AppContext);
  const colorScheme = useColorScheme();
  const pallette = usePallette();
  const [uploading, setUploading] = useState(false);
  const [imageUri, setImageUri] = useState(null);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    avatarContainer: {
      paddingTop: 50,
      paddingBottom: 30,
      backgroundColor: "#ff8043",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      elevation: 10,
      alignItems: "center",
    },
    name: {
      ...pallette.primaryHeading,
      color: "#fff",
      fontSize: 35,
      textAlign: "center",
    },
    actionsContainer: {
      backgroundColor: colorScheme === "dark" ? "#3e3e3e" : "#fff",
      margin: 30,
      padding: 10,
      borderRadius: 15,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: "#ff8043",
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: 'white',
      padding: 5,
      borderRadius: 10,
      elevation: 5,
    },
    image: {
      borderRadius: 75,
      height: 120,
      width: 120,
    },
    message: {
      fontSize: 16,
      color: "red",
      textAlign: "center",
      margin: 20,
    },
  });

  async function pickImage() {
    if(isOnline){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.assets[0].uri)
      console.log("result.uri", result.assets[0].uri)
    }
  } else {
    alert("You are offline")
  }
  }

  async function uploadImage(uri) {
    setUploading(true);
    try {
      const storageRef = ref(storage, `profileImages/${userDetails?.userId}`);
      
      // Upload the image
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("Failed to fetch image.");
      }
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      
      const downloadURL = await getDownloadURL(storageRef);
      
      const userDocRef = doc(db, "userList", userDetails?.userId);
      await updateDoc(userDocRef, { profileImage: downloadURL });
      
      alert("Profile image updated successfully!");
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function logoutHandler() {
    await AsyncStorage.clear();
    auth.signOut();
    navigation.replace("Login");
  }

  return (
    <View style={pallette.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={{ position: 'relative' }}>
            <Image
              source={userDetails?.profileImage ? { uri: userDetails?.profileImage } : DummyUser}
              style={styles.image}
            />
            <Pressable style={styles.editButton} onPress={pickImage}>
            {uploading ? 
            <ActivityIndicator size="small" color="#ff8043" />
            :
            <Entypo name="edit" size={20} color="#2e2e2e" />}
              
            </Pressable>
          </View>
          <Text style={styles.name}>{userDetails?.name}</Text>
          <Text style={{ ...pallette.text, textAlign: "center", color: "#fff", fontSize: 18 }}>
            {userDetails?.email}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <TertiaryButton
            title={colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
            onPress={() => Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark")}
            loading={false}
            color="#ff8043"
            borderRadius={5}
            borderTopColor={"transparent"}
            borderTopWidth={0}
          />
          <TertiaryButton
            title="Edit Profile"
            onPress={() => console.log("Pressed")}
            loading={false}
            color="#ff8043"
            borderRadius={5}
            borderTopColor={"#ff8043"}
            borderTopWidth={1}
          />
          <TertiaryButton
            title="Logout"
            onPress={logoutHandler}
            loading={false}
            color="#ff8043"
            borderRadius={5}
            borderTopColor={"#ff8043"}
            borderTopWidth={1}
          />
        </View>
        
      </ScrollView>
    </View>
  );
}
