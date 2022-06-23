import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./styles";
import userData from "../../../assets/data/userData";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import FamilyMemberProfiles from "../../components/FamilyMemberProfiles/FamilyMemberProfiles";

const USER = userData.User[0];

const HomeScreen = () => {
  return (
    <View>
      {/* Header text container */}
      <View style={styles.header}>
        <View style={styles.greetingsContainer}>
          <View style={{ width: "100%" }}>
            <Text style={[styles.introText, { textAlign: "center" }]}>
              Hi, {USER.first}
            </Text>
          </View>
          <View style={styles.profileIconCircle}>
            <FontAwesome5 name="user-alt" size={35} color={Colors.orange} />
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
              <FamilyMemberProfiles userInfo={user} />
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
          <Text style={styles.familyMemberTitle}>Chores</Text>
          <Text style={styles.familyMemberSubTitle}>
            You can browse your family home chores,
          </Text>
          <Text style={styles.familyMemberSubTitle}>
            and create new chores in here.
          </Text>
        </View>
        <View style={styles.choresItemContainer}>
          <View style={styles.choresIconContainer}>
            <MaterialCommunityIcons
              name="flower-tulip"
              size={24}
              color="black"
            />
          </View>
          <Text>Water Plants</Text>
          <View>
            <Text>25</Text>
            <Text>Points</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
