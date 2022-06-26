import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import React from "react";
import styles from "./styles";
import BgImage from "../../../assets/images/homeScreenBgImage.png";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const AddChoreScreen = () => {
  return (
    <ImageBackground
      style={{ height: "100%" }}
      source={BgImage}
      resizeMode="cover"
    >
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <View>
            <Feather name="arrow-left" size={35} color={Colors.darkGreen} />
          </View>
          <View>
            <Text style={styles.addChoreTitle}>Add chore</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AddChoreScreen;
