import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const FamilyMemberProfiles = (props) => {
  // TODO: Holding profile pic will delete family member
  const navigation = useNavigation();
  console.log("Data: ", props.userInfo);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate("FamilyMemberScreen")}
      style={styles.familyMemberProfile}
    >
      <Image
        source={{ uri: props.userInfo.imageUrl }}
        style={{
          width: 50,
          height: 50,
        }}
      />
      {/* <View style={styles.familyMemberProfile}>
        <Text style={styles.familyMemberProfileInitials}>
          {props.userInfo.firstName[0] + props.userInfo.lastName[0]}
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default FamilyMemberProfiles;
