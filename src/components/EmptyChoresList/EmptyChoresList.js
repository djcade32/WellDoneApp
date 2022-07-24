import { View, Text, Image } from "react-native";
import React from "react";
import emptyChoresImage from "../../../assets/images/emptyChoresImage.png";
import Colors from "../../constants/Colors";

const EmptyChoresList = () => {
  return (
    <View style={{ flexDirection: "row", alignContent: "center" }}>
      <Image source={emptyChoresImage} style={{ width: 150, height: 150 }} />
      <View
        style={{
          width: "40%",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.textColor,
            fontFamily: "poppins",
          }}
        >
          There are currently no chores to complete. Let's create a chore!
        </Text>
        <Text></Text>
      </View>
    </View>
  );
};

export default EmptyChoresList;
