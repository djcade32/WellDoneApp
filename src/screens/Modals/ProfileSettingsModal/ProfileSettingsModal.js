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
import { useState, useEffect } from "react";
import React from "react";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";
import BgImage from "../../../../assets/images/familyMemberScreenBgImage.png";
import { FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Storage, Auth } from "aws-amplify";
import { useAuthContext } from "../../../contexts/AuthContext";
import uuid from "react-native-uuid";
import { useUserInfoContext } from "../../../contexts/UserInfoContext";

const ProfileSettingsModal = () => {
  const { updateUser } = useUserInfoContext();
  const { dbUser, setDbUser } = useAuthContext();
  const [image, setImage] = useState(dbUser?.imageUrl);
  const [userProfilePicChanged, setUserProfilePicChanged] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const {
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: dbUser?.firstName,
      lastName: dbUser?.lastName,
      gender: dbUser?.gender,
    },
  });

  useEffect(() => {
    Storage.get(dbUser?.imageId, {
      level: "protected",
    }).then((url) => setImage(url));
  }, []);

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
      setUserProfilePicChanged(true);
    }
  };

  async function handleSaveEditPress(data) {
    console.log("Edit Mode: ", editMode);
    if (!editMode) {
      setEditMode(true);
      return;
    }
    setEditMode(false);
    console.log("userProfilePicChanged: ", userProfilePicChanged);
    if (
      data.firstName !== dbUser.firstName ||
      data.lastName !== dbUser.lastName ||
      data.gender !== dbUser.gender ||
      userProfilePicChanged
    ) {
      console.log("updating user");
      const updatedUserObj = {
        ...data,
        imageId: userProfilePicChanged ? uuid.v4() : dbUser?.imageId,
      };
      await updateUser(updatedUserObj, image);
      return;
    }
    console.log("No change detected");
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
            {editMode && (
              <Pressable
                onPress={pickImage}
                style={styles.changeProfilePicButton}
              >
                <MaterialIcons name="edit" size={24} color={Colors.lightGray} />
              </Pressable>
            )}
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
              {editMode ? "Save Profile" : "Edit Profile"}
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

          <Pressable
            onPress={() => {
              Auth.signOut();
              console.log("User Signed Out: ", dbUser.id);
            }}
          >
            <Text
              style={{
                marginVertical: 30,
                fontFamily: "poppins",
                fontSize: 16,
                color: Colors.darkGray,
              }}
            >
              Sign Out
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ProfileSettingsModal;
