import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
export default StyleSheet.create({
  userSearchCard: {
    flexDirection: "row",
    height: 70,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    marginBottom: 20,
    alignItems: "center",
  },
  profileIconCircle: {
    borderWidth: 1,
    borderColor: Colors.darkGreen,
    overflow: "hidden",
    marginRight: 15,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  userSearchCardTitle: {
    fontFamily: "poppins",
    fontSize: 16,
    color: Colors.textColor,
    alignSelf: "center",
    // textAlign: "center",
  },
});
