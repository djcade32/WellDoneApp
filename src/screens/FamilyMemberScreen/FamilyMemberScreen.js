import { View, Text, FlatList } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import userData from "../../../assets/data/userData";
import styles from "./styles";

const USER = userData.User[0];

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

const FamilyMemberScreen = () => {
  // Code to get day of the week
  const d = new Date("June 23, 2022");
  let day = d.getDay();

  // Code to get number of days in month
  var dt = new Date();
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();
  let daysInMonth = new Date(year, month, 0).getDate();
  return (
    <View>
      <View style={styles.headerContainer}>
        <View>
          <Feather name="arrow-left" size={35} color={Colors.darkGreen} />
        </View>
        <View>
          <Text style={styles.familyMemberName}>
            {USER.first + " " + USER.last}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text style={styles.userPoints}>256</Text>
            <Text style={styles.pointsText}> Points</Text>
          </View>
        </View>
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
              console.log(day);
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
      </View>
    </View>
  );
};

export default FamilyMemberScreen;
