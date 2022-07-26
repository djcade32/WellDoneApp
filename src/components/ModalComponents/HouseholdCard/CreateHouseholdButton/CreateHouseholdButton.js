import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import styles from "./styles";
import Colors from "../../../../constants/Colors";

const CreateHouseholdButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => props.setModalVisible(true)}
      style={styles.addHouseholdButton}
    >
      <Text style={styles.addHouseholdButtonTitle}>Create New Household</Text>
    </TouchableOpacity>
  );
};

export default CreateHouseholdButton;
