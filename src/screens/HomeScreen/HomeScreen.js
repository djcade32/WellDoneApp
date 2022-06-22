import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import userData from "../../../assets/data/userData";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const USER = userData.User[0];

const HomeScreen = () => {
  return (
    <View>
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
      <View style={styles.contentContainer}>
        <View style={styles.familyMemberContainer}>
          <Text style={styles.familyMemberTitle}>Family Members</Text>
          <Text style={styles.familyMemberSubTitle}>
            You can add your family members in here.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
