import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { Storage, DataStore } from "aws-amplify";
import { useAuthContext } from "./AuthContext";
import { User } from "../models";
import uuid from "react-native-uuid";

const UserInfoContext = createContext({});

const UserInfoContextProvider = (props) => {
  const { dbUser, setDbUser, getCurrentUser } = useAuthContext();
  const [currentUser, setCurrentUser] = useState({
    firstName: dbUser?.firstName,
    lastName: dbUser?.lastName,
    gender: dbUser?.gender,
    image: "",
    imageId: dbUser?.imageId,
    householdIds: dbUser?.householdIds,
  });

  async function updateUser(updatedUserObj, image) {
    try {
      const originalUserInfo = await getCurrentUser();
      if (dbUser?.imageId !== updatedUserObj.imageId) {
        console.log("current user changed image");
        deleteProfilePic(dbUser?.imageId);
        await uploadProfilePic(updatedUserObj.imageId, image);
      }
      const user = await DataStore.save(
        User.copyOf(originalUserInfo, (updated) => {
          updated.firstName = updatedUserObj.firstName;
          updated.lastName = updatedUserObj.lastName;
          updated.gender = updatedUserObj.gender;
          updated.imageId = updatedUserObj.imageId;
        })
      );
      console.log("Update user profile: ", user);
      setDbUser(user);
    } catch (e) {
      console.log("Error creating user:");
      console.log(e);
    }
  }

  async function uploadProfilePic(imageId, imagePath) {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      await Storage.put(imageId, blob, {
        level: "public",
        contentType: "image/jpeg", // contentType is optional
        progressCallback: () => {
          console.log("Attempting to upload image");
        },
      });
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  }

  async function deleteProfilePic(imageId) {
    console.log("Deleting old profile pic");
    try {
      await Storage.remove(imageId, { level: "public" });
    } catch {
      console.log("Removing old profile pic unsuccessful");
      console.log(e);
    }
  }

  async function addHouseholdToUser(householdId) {
    const originalUserInfo = await getCurrentUser();
    try {
      const user = await DataStore.save(
        User.copyOf(originalUserInfo, (updated) => {
          updated.householdIds = [...updated.householdIds, householdId];
          updated.activeHouseholdId = householdId;
        })
      );
      console.log("Adding household id: ", user);
      setDbUser(user);
    } catch (e) {
      console.log("Could not add householdId to user");
      console.log(e);
    }
  }

  async function getAllUsers() {
    const users = await DataStore.query(User);
    return users;
  }

  //   async function createUser({ firstName, lastName, gender, image, imageId }) {
  //     try {
  //       const user = await DataStore.save(
  //         new User({
  //           firstName,
  //           lastName,
  //           gender,
  //           sub,
  //           imageId,
  //         })
  //       )
  //         .then(setDbUser)
  //         .then(uploadProfilePic(imageId, image));
  //     } catch (e) {
  //       console.log("Error creating user:");
  //       console.log(e);
  //     }
  //   }

  return (
    <UserInfoContext.Provider
      value={{
        currentUser,
        uploadProfilePic,
        deleteProfilePic,
        updateUser,
        addHouseholdToUser,
        getAllUsers,
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContextProvider;

export const useUserInfoContext = () => useContext(UserInfoContext);
