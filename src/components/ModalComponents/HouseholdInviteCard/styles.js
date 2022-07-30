import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
export default StyleSheet.create({
  householdCard: {
    marginBottom: 25,

    height: 100,
    borderRadius: 10,
    justifyContent: "space-evenly",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  householdCardTitle: {
    fontFamily: "poppins",
    fontSize: 16,
    color: "white",
    textAlign: "center",
    alignSelf: "center",
  },
});
