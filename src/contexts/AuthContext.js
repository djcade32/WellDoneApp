import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";

const AuthContext = createContext({});

const AuthContextProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const sub = authUser?.attributes?.sub;

  useEffect(() => {
    console.log("Fetching auth user");
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  useEffect(() => {
    console.log("Finding User in DB");
    DataStore.query(User, (user) => user.sub("eq", sub)).then((users) => {
      if (users.length >= 1) {
        console.log("User: ", users[0]);
        setDbUser(users[0]);
      } else {
        console.log("User not found");
      }
    });
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

  return (
    <AuthContext.Provider
      value={{
        authUser,
        dbUser,
        sub,
        setDbUser,
        getCurrentUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
