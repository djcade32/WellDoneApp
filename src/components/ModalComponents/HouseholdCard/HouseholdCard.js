import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";

const HouseholdCard = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => alert("Household changed")}
      style={styles.householdCard}
    >
      <Text style={styles.householdCardTitle}>Cade's Household</Text>
    </TouchableOpacity>
  );
};

export default HouseholdCard;
