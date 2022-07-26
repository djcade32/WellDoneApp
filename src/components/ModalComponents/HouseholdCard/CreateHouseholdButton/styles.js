import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";
export default StyleSheet.create({
  addHouseholdButton: {
    marginBottom: 25,

    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderStyle: "dashed",
    borderColor: Colors.darkGreen,
    borderWidth: 1,
  },
  addHouseholdButtonTitle: {
    fontFamily: "poppins",
    fontSize: 16,
    color: Colors.darkGreen,
    textAlign: "center",
  },
});
