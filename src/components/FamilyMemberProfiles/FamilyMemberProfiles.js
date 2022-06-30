import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const FamilyMemberProfiles = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate("FamilyMemberScreen")}
      style={{ marginRight: 15, paddingTop: 15 }}
    >
      <View style={styles.familyMemberProfile}>
        <Text style={styles.familyMemberProfileInitials}>
          {props.userInfo.first[0] + props.userInfo.last[0]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FamilyMemberProfiles;
