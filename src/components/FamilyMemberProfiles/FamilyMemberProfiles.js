import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "aws-amplify";
import { useAuthContext } from "../../contexts/AuthContext";
import { useHouseholdContext } from "../../contexts/HouseholdContext";

const FamilyMemberProfiles = (props) => {
  // TODO: Holding profile pic will delete family member
  const navigation = useNavigation();
  const { dbUser } = useAuthContext();
  const { getUser } = useHouseholdContext();
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const screen =
    props?.userInfo?.id === dbUser?.id ? "ProfileScreen" : "FamilyMemberScreen";

  useEffect(() => {
    console.log(
      "Setting Profile Pic of Family member profile pics on home screen"
    );
    getHouseholdMember();

    console.log("Set Screen: ", screen);
  }, []);

  async function getHouseholdMember() {
    const user = await getUser(props.userInfo.id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    Storage.get(user.imageId, {
      level: "public",
    }).then((url) => setImage(url));
  }
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
            {firstName[0] + lastName[0]}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FamilyMemberProfiles;
