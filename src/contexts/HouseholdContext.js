import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { Storage, DataStore } from "aws-amplify";
import { useAuthContext } from "./AuthContext";
import { useUserInfoContext } from "./UserInfoContext";
import { Household, User } from "../models";
import uuid from "react-native-uuid";

const HouseholdContext = createContext({});

const HouseholdContextProvider = (props) => {
  const { dbUser, setDbUser, getCurrentUser, getUserById } = useAuthContext();
  const { addHouseholdToUser } = useUserInfoContext();
  const [currentHousehold, setCurrentHousehold] = useState(null);
  const [currentUserPoints, setCurrentUserPoints] = useState(0);
  const [currentHouseholdMembers, setCurrentHouseholdMembers] = useState([]);
  const [currentAvailableChores, setCurrentAvailableChores] = useState([]);

  useMemo(() => {
    if (dbUser?.activeHouseholdId !== "" && dbUser !== null) {
      console.log("Finding active household in DB");
      DataStore.query(Household, (household) =>
        household.id("eq", dbUser?.activeHouseholdId)
      ).then((households) => {
        if (households.length >= 1) {
          console.log("Active Household: ", households[0]);
          setCurrentHousehold(households[0]);
          households[0].householdMembers.forEach((member) => {
            if (member.id === dbUser?.id) {
              setCurrentUserPoints(member.points);
            } else {
              console.log("Cannot find current user's points");
            }
          });
        } else {
          console.log("Active household not found");
        }
      });
    }
  }, [dbUser?.activeHouseholdId]);

  async function switchActiveHousehold(householdId) {
    const originalUserInfo = await getCurrentUser();
    try {
      const user = await DataStore.save(
        User.copyOf(originalUserInfo, (updated) => {
          updated.activeHouseholdId = householdId;
        })
      );
      console.log("Changing Active household id: ", user);
      setDbUser(user);
    } catch (e) {
      console.log("Could not change Active household id: ", e);
    }
  }

  // TODO: Just pull household from context and go from there. Do not worry about separating each element into its onwn state
  // useEffect(() => {
  //   if (currentHousehold) {
  //     console.log("Populating Household Members");
  //     currentHousehold.householdMembers.forEach((member) => {
  //       console.log(currentHousehold.householdMembers.length);
  //       DataStore.query(User, (user) => user.id("eq", member.id)).then(
  //         (users) => {
  //           if (users.length >= 1) {
  //             console.log("Adding household member");
  //             setCurrentHouseholdMembers((prevState) => [
  //               ...prevState,
  //               users[0],
  //             ]);
  //           } else {
  //             console.log("No members found");
  //           }
  //         }
  //       );
  //     });
  //   }
  // }, [currentHousehold]);

  // useMemo(() => {
  //   if (dbUser !== null && currentHousehold !== null) {
  //     if (currentHousehold && currentHousehold.availableChores.length > 0) {
  //       setCurrentAvailableChores(currentHousehold.availableChores);
  //     }
  //     console.log(
  //       "Getting available chores: ",
  //       currentHousehold?.availableChores
  //     );
  //   }
  // }, [currentHousehold?.availableChores]);

  async function getUser(id) {
    const user = await DataStore.query(User, (user) => user.id("eq", id)).then(
      (users) => {
        if (users.length >= 1) {
          return users[0];
        } else {
          console.log("User not found");
        }
      }
    );
    return user;
  }

  async function inviteUserToHousehold(userInfo) {
    console.log("Inviting User");
    try {
      const user = await DataStore.save(
        User.copyOf(userInfo, (updated) => {
          updated.householdInvites = [
            ...updated.householdInvites,
            {
              id: uuid.v4(),
              householdId: currentHousehold.id,
              status: "PENDING",
              name: currentHousehold.name,
            },
          ];
        })
      );

      const household = await DataStore.save(
        Household.copyOf(currentHousehold, (updated) => {
          updated.sentInvites = [...updated.sentInvites, userInfo.id];
        })
      );
      console.log("Inviting user: ", user);
      console.log("Invitation sent by household: ", household);
    } catch (e) {
      console.log("Could not invite user");
      console.log(e);
    }
  }

  async function createHousehold(name) {
    setCurrentHouseholdMembers([]);
    try {
      const household = await DataStore.save(
        new Household({
          creatorId: dbUser?.id,
          householdMembers: [{ id: dbUser?.id, points: 0 }],
          adminIds: [dbUser?.id],
          availableChores: [],
          doneChores: [],
          sentInvites: [],
          name: name,
          households: [],
        })
      );
      setCurrentHousehold(household);
      addHouseholdToUser(household);
      console.log("Household created: ", household);
    } catch (e) {
      console.log("Error creating household:");
      console.log(e);
    }
  }

  async function acceptHouseholdInvitation(householdId) {
    console.log("Accepting household invitation");
    const originalUserInfo = await getCurrentUser();
    newHouseholdInviteArray = originalUserInfo.householdInvites.filter(
      (invite) => invite.id !== householdId
    );
    try {
      const user = await DataStore.save(
        User.copyOf(originalUserInfo, (updated) => {
          updated.householdInvites = newHouseholdInviteArray;
          updated.householdIds = [...updated.householdIds, householdId];
        })
      );
      setDbUser(user);
    } catch (e) {
      console.log("Could not delete household invitation");
      console.log(e);
    }
  }

  async function addUserToHousehold() {
    console.log("Adding user to household");
    try {
      const household = await DataStore.save(
        Household.copyOf(currentHousehold, (updated) => {
          updated.householdMembers = [
            ...updated.householdMembers,
            {
              id: dbUser.id,
              points: 0,
            },
          ];
        })
      );
      console.log("Adding user to household: ", household);
    } catch (e) {
      console.log("Could not add user to household");
      console.log(e);
    }
  }

  return (
    <HouseholdContext.Provider
      value={{
        switchActiveHousehold,
        createHousehold,
        currentHousehold,
        currentUserPoints,
        currentHouseholdMembers,
        currentAvailableChores,
        getUser,
        inviteUserToHousehold,
        acceptHouseholdInvitation,
        addUserToHousehold,
      }}
    >
      {props.children}
    </HouseholdContext.Provider>
  );
};

export default HouseholdContextProvider;

export const useHouseholdContext = () => useContext(HouseholdContext);
