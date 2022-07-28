import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default StyleSheet.create({
  familyMemberProfile: {
    borderRadius: 50 / 2,
    backgroundColor: Colors.lightGray,
    width: 50,
    height: 50,
    justifyContent: "center",
  },
  imageContainer: {
    borderRadius: 50 / 2,
    backgroundColor: Colors.lightGray,
    width: 50,
    height: 50,
    justifyContent: "center",
    marginRight: 15,
    marginTop: 15,
    alignItems: "center",
    overflow: "hidden",
  },
  familyMemberProfileInitials: {
    textAlign: "center",
    fontFamily: "poppins-medium",
    fontSize: 16,
    letterSpacing: 1,
    color: Colors.textColor,
  },
});
