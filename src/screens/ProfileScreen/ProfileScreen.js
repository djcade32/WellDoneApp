import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import userData from "../../../assets/data/userData";
import ChoreCard from "../../components/ChoreCard/ChoreCard";
import BgImage from "../../../assets/images/familyMemberScreenBgImage.png";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useUserInfoContext } from "../../contexts/UserInfoContext";

const USER = userData.User[0];
const HOUSEHOLD = userData.HouseHold[0];

const MONTHS = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useUserInfoContext();
  const [image, setImage] = useState(currentUser?.image ?? null);
  const [firstName, setFirstName] = useState(currentUser?.firstName);
  const [lastName, setLastName] = useState(currentUser?.lastName);

  // Code to get day of the week
  const d = new Date("June 23, 2022");
  let day = d.getDay();

  // Code to get number of days in month
  var dt = new Date();
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();
  let daysInMonth = new Date(year, month, 0).getDate();

  useMemo(() => {
    setImage(currentUser?.image ?? null);
    setFirstName(currentUser?.firstName);
    setLastName(currentUser?.lastName);
  }, [currentUser]);
  return (
    <ImageBackground
      style={{ flex: 1, paddingTop: 50 }}
      source={BgImage}
      resizeMode="cover"
    >
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={35} color={Colors.darkGreen} />
        </Pressable>

        <View style={{ alignItems: "center" }}>
          <View style={styles.profilePicContainer}>
            <View style={styles.imageContainer}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              ) : (
                <View style={styles.initials}>
                  <Text style={styles.initialsFont}>{firstName[0]}</Text>
                  <Text style={styles.initialsFont}>{lastName[0]}</Text>
                </View>
              )}
            </View>
          </View>
          <Text style={styles.userName}>{firstName + " " + lastName}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("ProfileSettingsModal")}
        >
          <FontAwesome5 name="user-cog" size={30} color={Colors.darkGreen} />
        </TouchableOpacity>
      </View>
      <View style={styles.pointsContainer}>
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text style={styles.pointsText}>Points</Text>
          <Text style={styles.userPoints}>256</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.calendar}>
            <FlatList
              style={{ width: "80%", alignSelf: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={MONTHS}
              renderItem={({ item }) => (
                <Text style={styles.calendarMonthText}>{item}</Text>
              )}
            />
            <FlatList
              snapToInterval={50}
              contentContainerStyle={{ paddingLeft: 25 }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={[...Array(daysInMonth)]}
              renderItem={(data) => {
                const d = new Date("June" + (data.index + 1) + ", 2022");
                let day = d.getDay();
                return (
                  <View style={styles.calendarDatesContainer}>
                    <Text style={styles.calendarDateNumber}>
                      {data.index + 1}
                    </Text>
                    <Text style={styles.calendarDateDay}>{DAYS[day]}</Text>
                  </View>
                );
              }}
            />
          </View>
          <Text style={[styles.choresTitle, { marginLeft: 25 }]}>
            {USER.first}'s Chores
          </Text>
          <Text style={[styles.choresSubTitle, { marginLeft: 25 }]}>
            {USER.first} has {USER.userDoneChores.length} chore done on May 14.
          </Text>

          <FlatList
            contentContainerStyle={{ paddingLeft: 25 }}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 20 }}
            horizontal={true}
            data={HOUSEHOLD.availableChores}
            renderItem={({ item }) => <ChoreCard choreInfo={item} />}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
