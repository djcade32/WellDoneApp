import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { Storage, DataStore } from "aws-amplify";
import { useAuthContext } from "./AuthContext";
import { useUserInfoContext } from "./UserInfoContext";
import { Household, User } from "../models";

const HouseholdContext = createContext({});

const HouseholdContextProvider = (props) => {
  const { dbUser, setDbUser, getCurrentUser } = useAuthContext();
  const { addHouseholdToUser } = useUserInfoContext();
  const [currentHousehold, setCurrentHousehold] = useState(null);
  const [currentUserPoints, setCurrentUserPoints] = useState(0);
  const [currentHouseholdMembers, setCurrentHouseholdMembers] = useState([]);

  useMemo(() => {
    if (dbUser?.activeHouseholdId != "") {
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

  useMemo(() => {
    if (currentHousehold) {
      console.log("Populating Household Members");

      currentHousehold.householdMembers.forEach((member) => {
        console.log(currentHousehold.householdMembers.length);
        DataStore.query(User, (user) => user.id("eq", member.id)).then(
          (users) => {
            if (users.length >= 1) {
              setCurrentHouseholdMembers((prevState) => [
                ...prevState,
                users[0],
              ]);
            } else {
              console.log("No members found");
            }
          }
        );
      });
    }
  }, [currentHousehold]);

  async function createHousehold(name) {
    try {
      const household = await DataStore.save(
        new Household({
          creatorId: dbUser?.id,
          householdMembers: [{ id: dbUser?.id, points: 0 }],
          name: name,
          adminIds: [dbUser?.id],
        })
      );
      setCurrentHousehold(household);
      addHouseholdToUser(household.id);
      console.log("Household created: ", household);
    } catch (e) {
      console.log("Error creating household:");
      console.log(e);
    }
  }

  return (
    <HouseholdContext.Provider
      value={{
        createHousehold,
        currentHousehold,
        currentUserPoints,
        currentHouseholdMembers,
      }}
    >
      {props.children}
    </HouseholdContext.Provider>
  );
};

export default HouseholdContextProvider;

export const useHouseholdContext = () => useContext(HouseholdContext);