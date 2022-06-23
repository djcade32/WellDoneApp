import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";

const FamilyMemberProfiles = (props) => {
  return (
    <View style={{ marginRight: 15, paddingTop: 15 }}>
      <View style={styles.familyMemberProfile}>
        <Text style={styles.familyMemberProfileInitials}>
          {props.userInfo.first[0] + props.userInfo.last[0]}
        </Text>
      </View>
    </View>
  );
};

export default FamilyMemberProfiles;
