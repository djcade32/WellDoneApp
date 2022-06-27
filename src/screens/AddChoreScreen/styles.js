import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default StyleSheet.create({
  screenContainer: {
    marginTop: 30,
  },
  addChoreTitle: {
    fontSize: 24,
    fontFamily: "poppins-medium",
    color: Colors.textColor,
    textAlign: "center",
  },
  contentContainer: {
    backgroundColor: "white",
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 50,
    marginTop: 50,
  },
  inputContainer: {
    paddingHorizontal: 50,
    marginBottom: 30,
  },
  inputTitle: {
    fontFamily: "poppins",
    color: Colors.textColor,
    marginBottom: 5,
  },
  inputField: {
    width: "100%",
    borderBottomColor: Colors.textColor,
    borderBottomWidth: 1,
    marginTop: 5,
    fontSize: 16,
    fontFamily: "poppins",
    paddingBottom: 5,
  },
  choreIconContainer: {
    backgroundColor: Colors.lightGray,
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    // borderWidth: 1,
    // borderColor: "red",
  },
  choreIconListContainer: {
    paddingLeft: 30,
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
});
