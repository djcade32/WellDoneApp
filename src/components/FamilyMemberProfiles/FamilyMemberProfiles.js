import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Storage, DataStore } from "aws-amplify";

const FamilyMemberProfiles = (props) => {
  // TODO: Holding profile pic will delete family member
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  console.log("Data: ", props.userInfo);
  useEffect(() => {
    console.log(
      "Setting Profile Pic of Family member profile pics on home screen"
    );
    Storage.get(props?.userInfo?.imageId, {
      level: "protected",
    }).then((url) => setImage(url));
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate("FamilyMemberScreen")}
      style={styles.imageContainer}
    >
      {image !== "" ? (
        <Image
          source={{ uri: image }}
          style={{
            width: 50,
            height: 50,
          }}
        />
      ) : (
        <View style={styles.familyMemberProfile}>
          <Text style={styles.familyMemberProfileInitials}>
            {props.userInfo.firstName[0] + props.userInfo.lastName[0]}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FamilyMemberProfiles;
