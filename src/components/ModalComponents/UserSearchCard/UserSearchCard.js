import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { Storage } from "aws-amplify";
import { useAuthContext } from "../../../contexts/AuthContext";

const UserSearchCard = (props) => {
  console.log("user cards: ", props.userInfo);
  const { dbUser } = useAuthContext();

  const [image, setImage] = useState("");

  useEffect(() => {
    Storage.get(props.userInfo.imageId, {
      level: "public",
      identityId: props.userInfo.id,
    }).then((url) => setImage(url));
  }, []);
  return (
    <View style={styles.userSearchCard}>
      {/* <View style={styles.profileIconCircle}>
        <FontAwesome5 name="user-alt" size={50} color={Colors.darkGreen} />
      </View> */}
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
          onPress={() => alert("Add " + props.userInfo.firstName + " member")}
          style={{ marginLeft: "auto", marginRight: 20 }}
        >
          <AntDesign name="pluscircleo" size={30} color={Colors.darkGreen} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserSearchCard;
