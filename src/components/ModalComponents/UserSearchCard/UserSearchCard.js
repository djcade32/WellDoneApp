import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { Storage } from "aws-amplify";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useHouseholdContext } from "../../../contexts/HouseholdContext";

const UserSearchCard = (props) => {
  console.log("user cards: ", props.userInfo);
  const { dbUser } = useAuthContext();
  const { inviteUserToHousehold } = useHouseholdContext();
  const [userAdded, setUserAdded] = useState(false);

  const [image, setImage] = useState("");

  useEffect(() => {
    Storage.get(props.userInfo.imageId, {
      level: "public",
      identityId: props.userInfo.id,
    }).then((url) => setImage(url));
  }, []);

  function handleAddPress() {
    if (!userAdded) {
      setUserAdded(true);
      inviteUserToHousehold(props.userInfo);
    } else {
      setUserAdded(false);
    }
  }
  return (
    <View style={styles.userSearchCard}>
      {image !== "" ? (
        <View style={styles.profileIconCircle}>
          <Image
            source={{ uri: image }}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </View>
      ) : (
        <View style={styles.userProfile}>
          <Text style={styles.userProfileInitials}>
            {props.userInfo.firstName[0] + props.userInfo.lastName[0]}
          </Text>
        </View>
      )}
      <Text style={styles.userSearchCardTitle}>
        {props.userInfo.firstName + " " + props.userInfo.lastName}
      </Text>
      {dbUser?.id !== props.userInfo.id && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleAddPress}
          style={{ marginLeft: "auto", marginRight: 20 }}
        >
          {userAdded ? (
            <MaterialIcons name="cancel" size={30} color={Colors.darkGreen} />
          ) : (
            <AntDesign name="pluscircleo" size={30} color={Colors.darkGreen} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserSearchCard;
