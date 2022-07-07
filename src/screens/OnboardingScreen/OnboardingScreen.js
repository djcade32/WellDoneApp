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
import { useForm, Controller } from "react-hook-form";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";

const OnboardingScreen = () => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const {
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function handleDonePress(data) {
    const userObj = { ...data, image: image };
    // navigation.navigate("HomeScreen");
  }

  // useEffect(() => {
  //   console.log("User info: ", userInfoObj);
  // }, [userInfoObj]);

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
                    style={styles.inputField}
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
                    style={styles.inputField}
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
                    defaultValue={value}
                    dropdownOverlayColor={"Transparent"}
                    defaultButtonText={"Select a gender"}
                    renderDropdownIcon={() => (
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color="white"
                      />
                    )}
                    buttonTextStyle={styles.dropdownInput}
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
            onPress={handleSubmit(handleDonePress)}
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
