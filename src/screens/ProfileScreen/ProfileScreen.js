import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState, useMemo } from "react";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import userData from "../../../assets/data/userData";
import ChoreCard from "../../components/ChoreCard/ChoreCard";
import BgImage from "../../../assets/images/familyMemberScreenBgImage.png";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { DataStore, Storage } from "aws-amplify";
import { useAuthContext } from "../../contexts/AuthContext";

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
  const { dbUser, sub, setDbUser } = useAuthContext();
  const [imageUrl, setImageUrl] = useState(null);

  // TODO: Move fetching profile pic logic to its own context.
  useMemo(async () => {
    const url = await Storage.get(dbUser.imageId, {
      level: "protected",
    });
    setImageUrl(url);
  }, [dbUser.imageId]);

  // Code to get day of the week
  const d = new Date("June 23, 2022");
  let day = d.getDay();

  // Code to get number of days in month
  var dt = new Date();
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();
  let daysInMonth = new Date(year, month, 0).getDate();
  return (
    <ImageBackground source={BgImage} resizeMode="cover">
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={35} color={Colors.darkGreen} />
          </Pressable>

          <View style={{ alignItems: "center" }}>
            <View style={styles.imageContainer}>
              {imageUrl ? (
                <Image
                  source={{ uri: imageUrl }}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              ) : (
                <View style={styles.profileIconCircle}>
                  <FontAwesome5
                    name="user-alt"
                    size={80}
                    color={Colors.darkGreen}
                  />
                </View>
              )}
            </View>
            <Text style={styles.userName}>{USER.first + " " + USER.last}</Text>
          </View>
          <Pressable onPress={() => alert("Open settings modal")}>
            <FontAwesome name="gear" size={35} color={Colors.darkGreen} />
          </Pressable>
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
              {USER.first} has {USER.userDoneChores.length} chore done on May
              14.
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
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ProfileScreen;
