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
  familyMemberProfileInitials: {
    textAlign: "center",
    fontFamily: "poppins-medium",
    fontSize: 16,
    letterSpacing: 1,
  },
});
