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
    let imageId = updatedUserObj.imageId;
    let userPicChanged = false;
    let user = null;
    try {
      const originalUserInfo = await getCurrentUser();
      if (dbUser?.imageUrl !== image) {
        deleteProfilePic(dbUser?.imageId);
        imageId = uuid.v4();
        console.log("current user changed image");
        userPicChanged = true;
        await uploadProfilePic(imageId, image);
        const url = await Storage.get(imageId, {
          level: "protected",
        });
        user = await DataStore.save(
          User.copyOf(originalUserInfo, (updated) => {
            updated.firstName = updatedUserObj.firstName;
            updated.lastName = updatedUserObj.lastName;
            updated.gender = updatedUserObj.gender;
            updated.imageUrl = url;
            updated.imageId = imageId;
          })
        );
      } else {
        user = await DataStore.save(
          User.copyOf(originalUserInfo, (updated) => {
            updated.firstName = updatedUserObj.firstName;
            updated.lastName = updatedUserObj.lastName;
            updated.gender = updatedUserObj.gender;
          })
        );
      }
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
        level: "protected",
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
      await Storage.remove(imageId, { level: "protected" });
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
      console.log("Update user profile: ", user);
      setDbUser(user);
    } catch (e) {
      console.log("Could not add householdId to user");
      console.log(e);
    }
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
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContextProvider;

export const useUserInfoContext = () => useContext(UserInfoContext);
