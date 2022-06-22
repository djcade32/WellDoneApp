import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default StyleSheet.create({
  header: { marginTop: 50 },
  greetingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    // borderColor: "red",
    // borderWidth: 1,
  },
  introText: {
    fontSize: 24,
    fontFamily: "poppins-medium",
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 50,
    paddingLeft: 50,
    paddingBottom: 50,
  },
  familyMemberTitle: {
    fontSize: 16,
    fontFamily: "poppins-medium",
    color: Colors.textColor,
  },
  familyMemberSubTitle: {
    fontFamily: "poppins",
    color: Colors.textColor,
  },
});
