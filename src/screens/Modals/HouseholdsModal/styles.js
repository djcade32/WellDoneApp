import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.darkGray,
    paddingTop: 25,
  },
  householdModalTitle: {
    textAlign: "center",
    fontFamily: "poppins-medium",
    fontSize: 24,
    color: "white",
  },
  householdModalSubTitle: {
    textAlign: "center",
    fontFamily: "poppins",
    fontSize: 16,
    color: "white",
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
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  modalTitle: {
    fontFamily: "poppins-medium",
    fontSize: 16,
    marginBottom: 20,
  },
  errorMessage: {
    marginTop: 5,
    color: "red",
    fontFamily: "poppins",
    textAlign: "center",
  },
});
