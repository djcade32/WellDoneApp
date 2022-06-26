import {
  View,
  Text,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import React from "react";
import styles from "./styles";
import userData from "../../../assets/data/userData";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import FamilyMemberProfiles from "../../components/FamilyMemberProfiles/FamilyMemberProfiles";
import ChoreCard from "../../components/ChoreCard/ChoreCard";
import BgImage from "../../../assets/images/homeScreenBgImage.png";

const USER = userData.User[0];
const HOUSEHOLD = userData.HouseHold[0];

const HomeScreen = () => {
  return (
    <ImageBackground source={BgImage} resizeMode="cover">
      <SafeAreaView>
        {/* Header text container */}
        <View style={styles.header}>
          <View style={styles.greetingsContainer}>
            <View style={{ width: "100%" }}>
              <Text style={[styles.introText, { textAlign: "center" }]}>
                Hi, {USER.first}
              </Text>
            </View>
            <View style={styles.profileIconCircle}>
              <FontAwesome5
                name="user-alt"
                size={35}
                color={Colors.darkGreen}
              />
            </View>
          </View>
          <View style={styles.introContainer}>
            <Text style={styles.introSecondaryText}>Let's complete your</Text>
            <Text style={styles.introText}>Family Home Chores!</Text>
          </View>
        </View>
        {/* Content container */}
        <View style={styles.contentContainer}>
          {/* Family member content container */}
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
              {userData.User.map((user) => (
                <FamilyMemberProfiles key={user.id} userInfo={user} />
              ))}
              <View style={{ marginRight: 15, paddingTop: 15 }}>
                <View style={styles.addFamilyMemberCircle}>
                  <Text style={styles.addFamilyMemberIcon}>+</Text>
                </View>
              </View>
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

          <View style={styles.addChoreButtonContainer}>
            <Text style={styles.addChoreText}>Add Chore</Text>
            <MaterialIcons
              style={{ marginLeft: "auto", marginRight: 20 }}
              name="arrow-forward-ios"
              size={24}
              color="white"
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
