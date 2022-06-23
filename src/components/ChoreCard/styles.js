import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default StyleSheet.create({
  choreItemContainer: {
    backgroundColor: Colors.lightGray,
    width: 150,
    marginRight: 15,
    height: 200,
    borderRadius: 15,
    justifyContent: "space-evenly",
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 20,
    paddingRight: 5,
    // borderColor: "red",
    // borderWidth: 1,
  },
  choreIconContainer: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40 / 2,
  },
  choreTitle: {
    fontFamily: "poppins-medium",
    color: Colors.textColor,
  },
  chorePointsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  chorePoints: {
    // fontFamily: "poppins-medium",
    fontSize: 24,
    marginRight: 3,
    color: Colors.textColor,
  },
  chorePointsText: {
    color: Colors.textColor,

    // borderColor: "red",
    // borderWidth: 1,
  },
});
