import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { Household } from "../../../models";
import { DataStore } from "aws-amplify";
import { useHouseholdContext } from "../../../contexts/HouseholdContext";
import Colors from "../../../constants/Colors";
import { useAuthContext } from "../../../contexts/AuthContext";

const HouseholdCard = (props) => {
  const [household, setHousehold] = useState(null);
  const [activeHousehold, setActiveHousehold] = useState(false);
  const { currentHousehold, switchActiveHousehold } = useHouseholdContext();

  useEffect(() => {
    console.log("household: ", props.householdId);
    // TODO: Need to add name to household invite model in DB
    console.log("Fetching household");
    fetchHousehold();
  }, []);

  async function fetchHousehold() {
    const fetchedHousehold = await DataStore.query(Household, (household) =>
      household.id("eq", props.householdId)
    );
    setHousehold(fetchedHousehold[0]);
    if (currentHousehold.id === fetchedHousehold[0].id) {
      setActiveHousehold(true);
    }
    console.log("Found household: ", fetchedHousehold);
  }

  return (
    <View
      activeOpacity={0.5}
      style={[
        styles.householdCard,
        { backgroundColor: Colors.darkGreen, flexDirection: "row" },
      ]}
    >
      <Text style={styles.householdCardTitle}>
        {household?.name.trim()}'s Household Invite
      </Text>
      <View
        style={{
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity>
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
