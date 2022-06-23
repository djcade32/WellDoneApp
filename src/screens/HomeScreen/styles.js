import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default StyleSheet.create({
  header: { marginTop: 50 },
  greetingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  introText: {
    fontSize: 24,
    fontFamily: "poppins-bold",
    color: Colors.textColor,
  },
  profileIconCircle: {
    borderWidth: 1,
    borderColor: Colors.orange,
    borderRadius: 50,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: 50,
  },
  introSecondaryText: {
    fontSize: 16,
    fontFamily: "poppins-medium",
    color: Colors.textColor,
  },
  introContainer: {
    marginLeft: 50,
    marginBottom: 30,
  },
  contentContainer: {
    backgroundColor: "white",
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 50,
    paddingLeft: 50,
    paddingBottom: 50,
  },
  familyMemberContainer: {
    height: "18%",
    // borderColor: "red",
    // borderWidth: 1,
  },
  familyMemberTitle: {
    fontSize: 16,
    fontFamily: "poppins-bold",
    color: Colors.textColor,
    marginBottom: 3,
  },
  familyMemberSubTitle: {
    fontFamily: "poppins",
    color: Colors.textColor,
  },
  addFamilyMemberCircle: {
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    justifyContent: "center",
    borderColor: Colors.lightGreen,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  addFamilyMemberIcon: {
    textAlign: "center",
    fontFamily: "poppins-medium",
    fontSize: 16,
    color: Colors.lightGreen,
  },
  choresContentContainer: {
    // paddingTop: 80,
  },
  choresItemContainer: {
    backgroundColor: Colors.lightGray,
    width: "45%",
    height: 200,
    borderRadius: 15,
  },
  choresIconContainer: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35 / 2,
  },
});
