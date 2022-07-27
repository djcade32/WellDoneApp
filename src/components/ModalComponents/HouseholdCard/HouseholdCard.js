import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { Household } from "../../../models";
import { DataStore } from "aws-amplify";
import { useHouseholdContext } from "../../../contexts/HouseholdContext";
import Colors from "../../../constants/Colors";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const HouseholdCard = (props) => {
  const navigation = useNavigation();
  const [household, setHousehold] = useState(null);
  const [activeHousehold, setActiveHousehold] = useState(false);
  const { currentHousehold, switchActiveHousehold } = useHouseholdContext();

  useEffect(() => {
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

  function handleHouseholdPress() {
    console.log(household.name + " " + household.id);
    console.log(currentHousehold.name + " " + currentHousehold.id);
    if (household.id !== currentHousehold.id) {
      console.log("Switching households");
      switchActiveHousehold(household.id);
      // TODO: Reuse modal component to show successful household switch
      navigation.goBack();
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleHouseholdPress}
      style={
        activeHousehold
          ? [styles.householdCard, { backgroundColor: Colors.darkGreen }]
          : [styles.householdCard, { backgroundColor: Colors.darkGray }]
      }
    >
      <Text style={styles.householdCardTitle}>
        {household?.name.trim()}'s Household
      </Text>
    </TouchableOpacity>
  );
};

export default HouseholdCard;
