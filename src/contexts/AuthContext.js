import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore, Storage } from "aws-amplify";
import { User } from "../models";

const AuthContext = createContext({});

const AuthContextProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const sub = authUser?.attributes?.sub;

  useEffect(() => {
    console.log("Fetching auth user");
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  useEffect(() => {
    console.log("Finding User in DB");
    if (authUser !== null) {
      DataStore.query(User, (user) => user.sub("eq", sub)).then((users) => {
        if (users.length >= 1) {
          console.log("User: ", users[0]);
          setIsFetchingUser(false);
          setDbUser(users[0]);
        } else {
          console.log("User not found");
          setIsFetchingUser(false);
        }
      });
    }
  }, [sub]);

  function getCurrentUser() {
    const currentUser = DataStore.query(User, (user) =>
      user.sub("eq", sub)
    ).then((users) => {
      if (users.length >= 1) {
        return users[0];
      } else {
        console.log("User not found");
      }
    });
    return currentUser;
  }

  function getUserById(id) {
    const foundUser = DataStore.query(User, (user) => user.sub("eq", id)).then(
      (users) => {
        if (users.length >= 1) {
          return users[0];
        } else {
          console.log("User not found");
        }
      }
    );
    return foundUser;
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        dbUser,
        sub,
        setDbUser,
        getCurrentUser,
        isFetchingUser,
        getUserById,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
