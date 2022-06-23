import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";
import Colors from "../../constants/Colors";

const ChoreCard = (props) => {
  return (
    <View key={props.choreInfo.id} style={styles.choreItemContainer}>
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
    </View>
  );
};

export default ChoreCard;
