import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { Household } from "../../../models";
import { DataStore } from "aws-amplify";
import { useHouseholdContext } from "../../../contexts/HouseholdContext";
import Colors from "../../../constants/Colors";

const HouseholdCard = (props) => {
  const [household, setHousehold] = useState(null);
  const [activeHousehold, setActiveHousehold] = useState(false);
  const { currentHousehold } = useHouseholdContext();

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

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => alert(household?.name + "'s household Clicked")}
      style={
        activeHousehold
          ? [styles.householdCard, { backgroundColor: Colors.darkGreen }]
          : [styles.householdCard, { backgroundColor: Colors.darkGray }]
      }
    >
      <Text style={styles.householdCardTitle}>
        {household?.name}'s Household
      </Text>
    </TouchableOpacity>
  );
};

export default HouseholdCard;
