import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { Household } from "../../../models";
import { DataStore } from "aws-amplify";

const HouseholdCard = (props) => {
  const [household, setHousehold] = useState(null);

  useEffect(() => {
    console.log("Fetching household name");
    fetchHousehold();
  }, []);

  async function fetchHousehold() {
    const fetchedHousehold = await DataStore.query(Household, (household) =>
      household.id("eq", props.householdId)
    );

    setHousehold(fetchedHousehold[0]);
    console.log("Found household: ", fetchedHousehold);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => alert(household?.name + "'s household Clicked")}
      style={styles.householdCard}
    >
      <Text style={styles.householdCardTitle}>
        {household?.name}'s Household
      </Text>
    </TouchableOpacity>
  );
};

export default HouseholdCard;
