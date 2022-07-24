import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";
import Colors from "../../constants/Colors";

const ChoreCard = (props) => {
  // TODO: Holding chore card will delete chore
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => alert("Completed chore")}
      key={props.choreInfo.id}
      style={styles.choreItemContainer}
    >
      <View style={styles.choreIconContainer}>
        <MaterialCommunityIcons
          name="flower-tulip"
          size={24}
          color={Colors.textColor}
        />
      </View>
      <Text numberOfLines={1} style={styles.choreTitle}>
        {props.choreInfo.name}
      </Text>
      <View style={styles.chorePointsContainer}>
        <Text style={styles.chorePoints}>{props.choreInfo.points}</Text>
        <Text style={styles.chorePointsText}>Points</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChoreCard;
