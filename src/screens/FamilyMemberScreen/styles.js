import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default StyleSheet.create({
  headerContainer: {
    marginTop: 50,
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "red",
    justifyContent: "space-around",
  },
  familyMemberName: {
    fontSize: 24,
    fontFamily: "poppins-medium",
    color: Colors.textColor,
  },
  userPoints: {
    color: Colors.darkGreen,
    fontFamily: "poppins-medium",
    fontSize: 24,
  },
  pointsText: {
    color: Colors.darkGreen,
    fontFamily: "poppins",
    fontSize: 16,
  },
  contentContainer: {
    backgroundColor: "white",
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 50,
    paddingTop: 50,
  },
  calendarMonthText: {
    color: Colors.textColor,
    fontFamily: "poppins",
    fontSize: 16,
    marginRight: 25,
  },
  calendarDatesContainer: {
    marginTop: 25,
    marginRight: 20,
    backgroundColor: Colors.lightGray,
    width: 50,
    height: 75,
    justifyContent: "center",
    borderRadius: 10,
    // padding: 20,
  },
  calendarDateNumber: {
    color: Colors.textColor,
    textAlign: "center",
    marginBottom: 3,
    fontFamily: "poppins",
    fontSize: 16,
  },
  calendarDateDay: {
    color: Colors.textColor,
    textAlign: "center",
    fontFamily: "poppins",
  },
});
