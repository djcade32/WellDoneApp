import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { useHouseholdContext } from "../../../contexts/HouseholdContext";
import Colors from "../../../constants/Colors";
import { useUserInfoContext } from "../../../contexts/UserInfoContext";

const HouseholdCard = (props) => {
  const { deleteHouseholdInvitation, addUserToHousehold } =
    useHouseholdContext();
  const { addHouseholdToUser } = useUserInfoContext();

  function handleAcceptPressed() {
    addHouseholdToUser(props.householdInvite.householdId);
    addUserToHousehold();
    deleteHouseholdInvitation(props.householdInvite.householdId);
  }

  return (
    <View
      activeOpacity={0.5}
      style={[
        styles.householdCard,
        { backgroundColor: Colors.darkGreen, flexDirection: "row" },
      ]}
    >
      <Text style={[styles.householdCardTitle, { maxWidth: "50%" }]}>
        {props.householdInvite?.name.trim()}'s Household Invite
      </Text>
      <View
        style={{
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={handleAcceptPressed}>
          <Text style={styles.householdCardTitle}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.householdCardTitle, { color: Colors.darkGray }]}>
            Decline
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HouseholdCard;
