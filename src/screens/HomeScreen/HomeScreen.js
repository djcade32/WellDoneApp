import {
  View,
  Text,
  FlatList,
  ImageBackground,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import styles from "./styles";
import userData from "../../../assets/data/userData";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import FamilyMemberProfiles from "../../components/FamilyMemberProfiles/FamilyMemberProfiles";
import ChoreCard from "../../components/ChoreCard/ChoreCard";
import BgImage from "../../../assets/images/homeScreenBgImage.png";
import NoHouseholdImage from "../../../assets/images/noHouseholdImage.png";
import { useNavigation } from "@react-navigation/native";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { useHouseholdContext } from "../../contexts/HouseholdContext";
import { Storage, DataStore } from "aws-amplify";

const USER = userData.User[0];
const HOUSEHOLD = userData.HouseHold[0];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { currentUser, getCurrentUserProfilPic } = useUserInfoContext();
  const {
    createHousehold,
    currentHousehold,
    currentUserPoints,
    currentHouseholdMembers,
  } = useHouseholdContext();
  const { dbUser } = useAuthContext();
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState(dbUser?.firstName);
  const [lastName, setLastName] = useState(dbUser?.lastName);
  const [householdIds, setHouseholdIds] = useState(dbUser?.householdIds);
  const [createHouseholdButtonPress, setCreateHouseholdButtonPress] =
    useState(false);
  const [householdName, setHouseholdName] = useState("");
  const [householdNameError, setHouseholdNameError] = useState(false);

  useMemo(() => {
    console.log("Setting User Info on home screen");
    console.log("User on Home screen: ", dbUser);
    Storage.get(dbUser?.imageId, {
      level: "protected",
    }).then((url) => setImage(url ?? null));
    setFirstName(dbUser?.firstName);
    setLastName(dbUser?.lastName);
    setHouseholdIds(dbUser?.householdIds);
  }, [dbUser]);

  useEffect(() => {
    console.log("Setting User Profile Pic on home screen");
    Storage.get(dbUser?.imageId, {
      level: "protected",
    }).then((url) => setImage(url));
  }, []);

  function handleCreateHouseholdPress() {
    if (createHouseholdButtonPress) {
      // create household and turn back false
      if (householdName !== "") {
        setCreateHouseholdButtonPress(false);
        createHousehold(householdName);
      } else {
        setHouseholdNameError(true);
      }

      return;
    }
    setCreateHouseholdButtonPress(true);
  }

  return (
    <ImageBackground
      style={{ flex: 1, paddingTop: 50 }}
      source={BgImage}
      resizeMode="cover"
    >
      {/* Header text container */}
      <View style={styles.header}>
        <View style={styles.greetingsContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("HouseholdsModal")}
          >
            <MaterialCommunityIcons
              name="folder-home"
              size={40}
              color={Colors.darkGreen}
            />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: "auto",
            }}
          >
            <Text style={styles.introText}>Hi, {firstName}</Text>
          </View>
          <View style={{ marginLeft: 30 }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("ProfileScreen")}
              style={styles.imageContainer}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
              ) : (
                <View style={styles.initials}>
                  <Text style={[styles.initialsFont]}>{firstName[0]}</Text>
                  <Text style={styles.initialsFont}>{lastName[0]}</Text>
                </View>
              )}
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: Colors.lightGreen,
                fontFamily: "poppins",
                fontSize: 16,
              }}
            >
              {currentUserPoints} pts
            </Text>
          </View>
        </View>
        {householdIds.length > 0 && (
          <View style={styles.introContainer}>
            <Text style={styles.introSecondaryText}>Let's complete your</Text>
            <Text style={styles.introText}>Family Home Chores!</Text>
          </View>
        )}
      </View>
      {/* Content container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.contentContainer}
      >
        {/* Family member content container */}
        {householdIds.length > 0 ? (
          <>
            {/* If user is apart of at least one household show this */}
            <View style={styles.familyMemberContainer}>
              <Text style={styles.familyMemberTitle}>Family Members</Text>
              <Text style={styles.familyMemberSubTitle}>
                You can add your family members in here.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {currentHouseholdMembers?.map((user) => (
                  <FamilyMemberProfiles key={user.id} userInfo={user} />
                ))}
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate("AddFamilyMemberModal")}
                  style={{ marginRight: 15, paddingTop: 15 }}
                >
                  <View style={styles.addFamilyMemberCircle}>
                    <Text style={styles.addFamilyMemberIcon}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* Chores content container */}
            <View style={styles.choresContentContainer}>
              <Text style={[styles.familyMemberTitle, { marginLeft: 50 }]}>
                Chores
              </Text>
              <Text style={[styles.familyMemberSubTitle, { marginLeft: 50 }]}>
                You can browse your family home chores,
              </Text>
              <Text style={[styles.familyMemberSubTitle, { marginLeft: 50 }]}>
                and create new chores in here.
              </Text>
              <FlatList
                contentOffset={[-50, 0]}
                contentContainerStyle={{ paddingLeft: 50 }}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 20 }}
                horizontal={true}
                data={HOUSEHOLD.availableChores}
                renderItem={({ item }) => <ChoreCard choreInfo={item} />}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("AddChoreScreen")}
              style={styles.addChoreButtonContainer}
            >
              <Text style={styles.addChoreText}>Add Chore</Text>
              <MaterialIcons
                style={{ marginLeft: "auto", marginRight: 20 }}
                name="arrow-forward-ios"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            {/* If user is not apart of at least one household show this */}
            <Image
              style={{ width: 200, height: 100, alignSelf: "center" }}
              source={NoHouseholdImage}
            />
            <View
              style={{
                alignSelf: "center",
                width: "85%",
                height: 90,
                justifyContent: "center",
              }}
            >
              {!createHouseholdButtonPress ? (
                <>
                  <Text style={styles.createHouseholdSubText}>
                    You are not apart of any households.
                  </Text>
                  <Text style={styles.createHouseholdMainText}>
                    Let's create a household, so you can start doing chores.
                  </Text>
                </>
              ) : (
                <View>
                  <Text style={styles.inputTitle}>Household Name</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Give household a name"
                    selectionColor={Colors.textColor}
                    onChangeText={(value) => {
                      if (householdNameError) {
                        setHouseholdNameError(false);
                      }
                      setHouseholdName(value);
                    }}
                  />
                  {householdNameError && (
                    <Text style={styles.errorMessage}>
                      Must enter household name
                    </Text>
                  )}
                </View>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.createHouseholdButtonContainer}
              onPress={handleCreateHouseholdPress}
            >
              <Text style={styles.createHouseholdButtonText}>
                {!createHouseholdButtonPress ? "Create Household" : "Done"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default HomeScreen;
