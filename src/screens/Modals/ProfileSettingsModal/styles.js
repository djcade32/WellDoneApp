import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  profileInfoFormContainer: {
    height: "90%",
    marginHorizontal: 25,
    borderRadius: 15,
    backgroundColor: Colors.darkGreen,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingTop: 25,
  },
  profileInfoTitle: {
    color: "white",
    fontFamily: "poppins-medium",
    fontSize: 18,
    marginBottom: 25,
  },
  profilePicContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },
  imageContainer: {
    backgroundColor: Colors.darkGray,
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  changeProfilePicButton: {
    backgroundColor: Colors.lightGreen,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 70,
    left: 70,
  },
  textInputsContainer: {
    width: "100%",
    // flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 50,
    marginBottom: 30,
  },
  inputTitle: {
    fontFamily: "poppins",
    color: "white",
    marginBottom: 5,
  },
  inputField: {
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginTop: 5,
    fontSize: 16,
    fontFamily: "poppins",
    paddingBottom: 5,
  },
  dropdownInput: {
    textAlign: "left",
    fontFamily: "poppins",
    fontSize: 16,
    color: "white",
  },
  dropDown: {
    backgroundColor: "transparent",
    height: 35,
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  addChoreButtonContainer: {
    backgroundColor: Colors.lightGreen,
    flexDirection: "row",
    width: "80%",
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: 65,
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
  errorMessage: {
    marginTop: 5,
    color: "red",
    fontFamily: "poppins",
  },
});
