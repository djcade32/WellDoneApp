import { createContext, useState, useMemo, useContext } from "react";
import { Storage, DataStore } from "aws-amplify";
import { useAuthContext } from "./AuthContext";
import { User } from "../models";
import uuid from "react-native-uuid";

const UserInfoContext = createContext({});

const UserInfoContextProvider = (props) => {
  const { dbUser, setDbUser } = useAuthContext();
  const [currentUser, setCurrentUser] = useState(null);

  useMemo(async () => {
    const url = await Storage.get(dbUser?.imageId, {
      level: "protected",
    });
    setCurrentUser({
      firstName: dbUser?.firstName,
      lastName: dbUser?.lastName,
      gender: dbUser?.gender,
      image: url,
      imageId: dbUser?.imageId,
    });
    console.log("Updating current user: ", dbUser);
  }, [dbUser]);

  async function uploadProfilePic(imageId, imagePath) {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      await Storage.put(imageId, blob, {
        level: "protected",
        contentType: "image/jpeg", // contentType is optional
        completeCallback: () => {
          console.log("Succesful Upload");
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
      value={{ currentUser, uploadProfilePic, deleteProfilePic }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContextProvider;

export const useUserInfoContext = () => useContext(UserInfoContext);
