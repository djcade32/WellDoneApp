import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import styles from "./styles";
import BgImage from "../../../assets/images/homeScreenBgImage.png";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import ChoreCard from "../../components/ChoreCard/ChoreCard";
import SelectDropdown from "react-native-select-dropdown";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import userData from "../../../assets/data/userData";
import { useNavigation, StackActions } from "@react-navigation/native";

const HOUSEHOLD = userData.HouseHold[0];
const CHORESICONS = [
  <FontAwesome5 name="bath" size={50} color={Colors.textColor} />,
  <MaterialCommunityIcons
    name="silverware-clean"
    size={50}
    color={Colors.textColor}
  />,
  <MaterialCommunityIcons
    name="robot-mower"
    size={50}
    color={Colors.textColor}
  />,
  <MaterialCommunityIcons name="mower" size={50} color={Colors.textColor} />,
  <Ionicons name="bed" size={50} color="black" />,
  <MaterialIcons name="cleaning-services" size={50} color={Colors.textColor} />,
  <MaterialIcons name="clean-hands" size={50} color={Colors.textColor} />,
  <MaterialIcons name="dry-cleaning" size={50} color={Colors.textColor} />,
  <MaterialCommunityIcons
    name="food-turkey"
    size={50}
    color={Colors.textColor}
  />,
  <MaterialCommunityIcons name="mirror" size={50} color={Colors.textColor} />,
  <MaterialIcons name="local-car-wash" size={50} color={Colors.textColor} />,
  <MaterialCommunityIcons
    name="washing-machine"
    size={50}
    color={Colors.textColor}
  />,
  <MaterialCommunityIcons
    name="dishwasher"
    size={50}
    color={Colors.textColor}
  />,
  <MaterialIcons name="pets" size={50} color={Colors.textColor} />,
  <FontAwesome5 name="toilet" size={50} color={Colors.textColor} />,
  <MaterialIcons name="dinner-dining" size={50} color={Colors.textColor} />,
  <FontAwesome5 name="tshirt" size={50} color={Colors.textColor} />,
  <FontAwesome name="home" size={50} color={Colors.textColor} />,
];

function getChoreIcon(chore) {
  switch (chore) {
    case "CleanKitchen":
      return (
        <MaterialCommunityIcons
          name="silverware-clean"
          size={50}
          color="black"
        />
      );
    case "CleanBathroom":
      return <FontAwesome5 name="bath" size={50} color="black" />;
    case "Vaccum":
      return (
        <MaterialCommunityIcons name="robot-mower" size={50} color="black" />
      );
    case "MowLawn":
      return <MaterialCommunityIcons name="mower" size={50} color="black" />;
    case "CleanRoom":
      return <Ionicons name="bed" size={50} color="black" />;
    default:
      return <MaterialIcons name="cleaning-services" size={50} color="black" />;
  }
}

const AddChoreScreen = () => {
  const navigation = useNavigation();
  function createChoreHandler() {
    navigation.dispatch(StackActions.replace("HomeScreen", "PUSH"));
  }
  return (
    <ImageBackground
      style={{ height: "100%" }}
      source={BgImage}
      resizeMode="cover"
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.screenContainer}>
            {/* The order of the Add Chore title and back button actually matters. This order allows
          the back button to be pressable */}
            <Text style={styles.addChoreTitle}>Add chore</Text>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                position: "absolute",
                left: 25,
              }}
            >
              <Feather name="arrow-left" size={35} color={Colors.darkGreen} />
            </Pressable>
            <View style={styles.contentContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Chore</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Type chore here"}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Points</Text>
                <TextInput
                  returnKeyType="done"
                  keyboardType="numeric"
                  style={styles.inputField}
                  placeholder={"Give chore points"}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Note</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={"Add additional information"}
                />
              </View>
              <View style={[styles.inputContainer, { marginBottom: 0 }]}>
                <Text style={styles.inputTitle}>Icon</Text>
              </View>
              <View style={{ marginBottom: 30 }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  contentContainerStyle={styles.choreIconListContainer}
                  data={CHORESICONS}
                  renderItem={({ item }) => (
                    <View style={styles.choreIconContainer}>{item}</View>
                  )}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={createChoreHandler}
                style={styles.addChoreButtonContainer}
              >
                <Text style={styles.addChoreText}>Create Chore</Text>
                <MaterialIcons
                  style={{ marginLeft: "auto", marginRight: 20 }}
                  name="arrow-forward-ios"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AddChoreScreen;
