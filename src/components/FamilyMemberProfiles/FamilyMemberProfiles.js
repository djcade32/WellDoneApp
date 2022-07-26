import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "aws-amplify";
import { useAuthContext } from "../../contexts/AuthContext";

const FamilyMemberProfiles = (props) => {
  // TODO: Holding profile pic will delete family member
  const navigation = useNavigation();
  const { dbUser } = useAuthContext();
  const [image, setImage] = useState("");
  const [screen, setScreen] = useState(
    props?.userInfo?.id === dbUser?.id ? "ProfileScreen" : "FamilyMemberScreen"
  );
  console.log("Data: ", props.userInfo);
  useEffect(() => {
    console.log(
      "Setting Profile Pic of Family member profile pics on home screen"
    );
    Storage.get(props?.userInfo?.imageId, {
      level: "protected",
    }).then((url) => setImage(url));
    console.log("Set Screen: ", screen);
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate(screen)}
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
