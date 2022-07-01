import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.darkGray,
    paddingTop: 25,
  },
  modalTitle: {
    textAlign: "center",
    fontFamily: "poppins-medium",
    fontSize: 24,
    color: Colors.textColor,
  },
  modalSubTitle: {
    textAlign: "center",
    fontFamily: "poppins",
    fontSize: 16,
    color: Colors.textColor,
    marginBottom: 15,
  },
  contentContainer: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  householdsContainer: {
    // borderColor: "red",
    // borderWidth: 1,
    paddingHorizontal: 5,
    paddingTop: 25,
    // height:s "80%",
  },
});
