import { View, Text } from "react-native";
import { useEffect } from "react";
import React from "react";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";

const OnboardingScreen = () => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  requestPermission();
  useEffect(() => {
    // async function getImagePermission() {
    //   const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    //   if (status !== "granted") {
    //     alert(
    //       "Please grant camera roll permissions inside your system's settings"
    //     );
    //   } else {
    //     console.log("Media Permissions are granted");
    //   }
    // }
    // getImagePermission();
  }, []);

  return (
    <View>
      <Text>OnboardingScreen</Text>
    </View>
  );
};

export default OnboardingScreen;
