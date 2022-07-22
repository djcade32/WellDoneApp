import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default StyleSheet.create({
  header: { marginTop: 15 },
  greetingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginHorizontal: 15,
  },
  introText: {
    fontSize: 24,
    fontFamily: "poppins-medium",
    color: Colors.textColor,
  },
  profileIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    overflow: "hidden",
    alignItems: "center",
    top: 10,
  },
  initials: {
    flexDirection: "row",
  },
  initialsFont: {
    fontFamily: "poppins-medium",
    color: Colors.darkGreen,
    fontSize: 32,
  },
  imageContainer: {
    backgroundColor: Colors.darkGray,
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderColor: Colors.darkGreen,
    borderWidth: 1,
  },
  introSecondaryText: {
    fontSize: 16,
    fontFamily: "poppins",
    color: Colors.textColor,
  },
  introContainer: {
    marginLeft: 50,
    marginBottom: 30,
  },
  contentContainer: {
    backgroundColor: "white",
    height: "100%",
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignSelf: "stretch",
  },
  familyMemberContainer: {
    paddingTop: 25,
    height: "35%",
    marginLeft: 50,
  },
  familyMemberTitle: {
    fontSize: 16,
    fontFamily: "poppins-medium",
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
  createHouseholdText: {
    color: Colors.darkGreen,
    fontFamily: "poppins-medium",
    fontSize: 16,
    width: "85%",
    textAlign: "center",
  },
});
