import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";
import BgImage from "../../../assets/images/familyMemberScreenBgImage.png";
import { FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  // useEffect(() => {
  //   async function getMediaPermission() {
  //     requestPermission();
  //     if (status?.status !== "granted") {
  //       alert(
  //         "Please grant camera roll permissions inside your system's settings"
  //       );
  //     } else {
  //       console.log("Media Permissions are granted");
  //     }
  //   }
  //   getMediaPermission();
  // }, []);

  return (
    <ImageBackground style={{ flex: 1 }} source={BgImage} resizeMode="cover">
      <SafeAreaView style={{ justifyContent: "center" }}>
        <View style={styles.profileInfoFormContainer}>
          <Text style={styles.profileInfoTitle}>Profile Information</Text>
          <View style={styles.profilePicContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
              {/* <View style={{ top: 10 }}>
                <FontAwesome5
                  name="user-alt"
                  size={80}
                  color={Colors.lightGray}
                />
              </View> */}
            </View>
            <Pressable
              onPress={pickImage}
              style={styles.changeProfilePicButton}
            >
              <MaterialIcons name="edit" size={24} color={Colors.lightGray} />
            </Pressable>
          </View>
          <View style={styles.textInputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>First name</Text>
              <TextInput
                style={styles.inputField}
                placeholder={" Type first name here"}
                placeholderTextColor={Colors.darkGray}
                selectionColor={Colors.lightGray}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Last name</Text>
              <TextInput
                style={styles.inputField}
                placeholder={" Type last name here"}
                placeholderTextColor={Colors.darkGray}
                selectionColor={Colors.lightGray}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Gender</Text>
              <SelectDropdown
                dropdownOverlayColor={"Transparent"}
                defaultButtonText={"Select a gender"}
                renderDropdownIcon={() => (
                  <Entypo name="chevron-small-down" size={24} color="white" />
                )}
                buttonTextStyle={styles.dropdownInput}
                buttonStyle={styles.dropDown}
                data={["Male", "Female", "Other"]}
                onSelect={(selectedItem) => {
                  console.log(selectedItem);
                }}
                rowStyle={{
                  backgroundColor: Colors.darkGreen,
                }}
                rowTextStyle={styles.dropdownInput}
                selectedRowStyle={{ backgroundColor: Colors.lightGreen }}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("HomeScreen")}
            style={styles.addChoreButtonContainer}
          >
            <Text style={styles.addChoreText}>Done</Text>
            <MaterialIcons
              style={{ marginLeft: "auto", marginRight: 20 }}
              name="arrow-forward-ios"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OnboardingScreen;
