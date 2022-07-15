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
import { useState } from "react";
import React from "react";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";
import BgImage from "../../../../assets/images/familyMemberScreenBgImage.png";
import { FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { User } from "../../../models";
import { DataStore, Storage } from "aws-amplify";
import { useAuthContext } from "../../../contexts/AuthContext";
import uuid from "react-native-uuid";
import { useUserInfoContext } from "../../../contexts/UserInfoContext";

const ProfileSettingsModal = () => {
  const { currentUser } = useUserInfoContext();
  const { dbUser, sub, setDbUser } = useAuthContext();
  const [image, setImage] = useState(currentUser?.image);
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(false);
  const {
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      gender: currentUser?.gender,
    },
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function handleSaveEditPress(data) {
    console.log("Edit Mode: ", editMode);
    if (!editMode) {
      setEditMode(true);
      return;
    }
    setEditMode(false);
    console.log("updating user");
    const updatedUserObj = {
      ...data,
      image: image,
      imageId: currentUser.imageId,
    };
    // console.log("user obj", updatedUserObj);
    if (!isEquivalent(updatedUserObj, currentUser)) {
      updateUser(updatedUserObj);
    }

    // // console.log("User object:", userObj);

    // // create user here
    // // navigation.navigate("HomeScreen");
  }

  async function updateUser(updatedUserObj) {
    if (currentUser.image !== image) {
      updatedUserObj.imageId = uuid.v4();
      console.log("current user changed image");
    }
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.firstName = updatedUserObj.firstName;
          updated.lastName = updatedUserObj.lastName;
          updated.gender = updatedUserObj.gender;
          updated.image = updatedUserObj.image;
          updated.imageId = updatedUserObj.imageId;
        })
      );
      console.log("Update user profile: ", user);
      //   setDbUser(user);
      //   if (currentUser.image !== image) {
      //     uploadProfilePic(imageId, image);
      //   }
    } catch (e) {
      console.log("Error creating user:");
      console.log(e);
    }
  }

  async function uploadProfilePic(imageId, imagePath) {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      await Storage.put(imageId, blob, {
        level: "protected",
        contentType: "image/jpeg", // contentType is optional
        completeCallback: () => {
          console.log("Succesful Upload");
        },
      });
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  }

  function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }

  return (
    <ImageBackground style={{ flex: 1 }} source={BgImage} resizeMode="cover">
      <SafeAreaView style={{ justifyContent: "center" }}>
        <View style={styles.profileInfoFormContainer}>
          <Text style={styles.profileInfoTitle}>Profile Information</Text>
          <View style={styles.profilePicContainer}>
            <View style={styles.imageContainer}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <View style={{ top: 10 }}>
                  <FontAwesome5
                    name="user-alt"
                    size={80}
                    color={Colors.lightGray}
                  />
                </View>
              )}
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
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    editable={editMode}
                    style={[
                      styles.inputField,
                      { color: editMode ? "white" : Colors.darkGray },
                    ]}
                    placeholder={" Type first name here"}
                    placeholderTextColor={Colors.darkGray}
                    selectionColor={Colors.lightGray}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="firstName"
                rules={{ required: true }}
              />
              {errors.firstName && (
                <Text style={styles.errorMessage}>Must enter first name</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Last name</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    editable={editMode}
                    style={[
                      styles.inputField,
                      { color: editMode ? "white" : Colors.darkGray },
                    ]}
                    placeholder={" Type last name here"}
                    placeholderTextColor={Colors.darkGray}
                    selectionColor={Colors.lightGray}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="lastName"
                rules={{ required: true }}
              />
              {errors.lastName && (
                <Text style={styles.errorMessage}>Must enter last name</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Gender (optional)</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SelectDropdown
                    disabled={!editMode}
                    defaultValue={value}
                    dropdownOverlayColor={"Transparent"}
                    defaultButtonText={"Select a gender"}
                    renderDropdownIcon={() => (
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color={editMode ? "white" : Colors.darkGray}
                      />
                    )}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontFamily: "poppins",
                      fontSize: 16,
                      color: editMode ? "white" : Colors.darkGray,
                    }}
                    buttonStyle={styles.dropDown}
                    data={["Male", "Female", "Other"]}
                    onSelect={onChange}
                    rowStyle={{
                      backgroundColor: Colors.darkGreen,
                      borderBottomColor: "white",
                      borderBottomWidth: 1,
                    }}
                    rowTextStyle={styles.dropdownInput}
                    selectedRowStyle={{ backgroundColor: Colors.lightGreen }}
                  />
                )}
                name="gender"
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleSubmit(handleSaveEditPress)}
            style={styles.addChoreButtonContainer}
          >
            <Text style={styles.addChoreText}>
              {editMode ? "Save" : "Edit"}
            </Text>
            {editMode && (
              <MaterialIcons
                style={{ marginLeft: "auto", marginRight: 20 }}
                name="arrow-forward-ios"
                size={24}
                color="white"
              />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ProfileSettingsModal;
