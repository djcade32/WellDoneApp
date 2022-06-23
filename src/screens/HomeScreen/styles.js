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
    borderColor: Colors.darkGreen,
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
    paddingTop: 25,
    paddingBottom: 50,
  },
  familyMemberContainer: {
    height: "17%",
    marginLeft: 50,
  },
  familyMemberTitle: {
    fontSize: 16,
    fontFamily: "poppins-bold",
    color: Colors.textColor,
    marginBottom: 3,
  },
  familyMemberSubTitle: {
    fontFamily: "poppins",
    color: Colors.darkGray,
  },
  addFamilyMemberCircle: {
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    justifyContent: "center",
    borderColor: Colors.darkGreen,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  addFamilyMemberIcon: {
    textAlign: "center",
    fontFamily: "poppins-medium",
    fontSize: 16,
    color: Colors.darkGreen,
  },
  choresContentContainer: {
    // paddingTop: 80,
  },
  addChoreButtonContainer: {
    backgroundColor: Colors.darkGreen,
    flexDirection: "row",
    width: "80%",
    marginTop: 20,
    marginLeft: "auto",
    padding: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  addChoreText: {
    color: "white",
    fontFamily: "poppins-medium",
    fontSize: 16,
    marginLeft: 25,
  },
});
