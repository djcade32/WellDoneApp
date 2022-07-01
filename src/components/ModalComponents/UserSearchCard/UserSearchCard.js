import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

const UserSearchCard = () => {
  return (
    <View style={styles.userSearchCard}>
      <View style={styles.profileIconCircle}>
        <FontAwesome5 name="user-alt" size={50} color={Colors.darkGreen} />
      </View>
      <Text style={styles.userSearchCardTitle}>Norman Cade</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => alert("Add family member")}
        style={{ marginLeft: "auto", marginRight: 20 }}
      >
        <AntDesign name="pluscircleo" size={30} color={Colors.darkGreen} />
      </TouchableOpacity>
    </View>
  );
};

export default UserSearchCard;
