import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import SearchBar from "../../../components/SearchBar/SearchBar";
import userData from "../../../../assets/data/userData";
import UserSearchCard from "../../../components/ModalComponents/UserSearchCard/UserSearchCard";
import { useUserInfoContext } from "../../../contexts/UserInfoContext";

const USER = userData.User;

const AddFamilyMemberModal = () => {
  const { getAllUsers } = useUserInfoContext();
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  async function getUsers() {
    const users = await getAllUsers();
    setAllUsers(users);
  }
  return (
    <View style={styles.modalContainer}>
      {/* <Text style={styles.modalTitle}>Add Family Member</Text>
      <Text style={styles.modalSubTitle}>Tap household to switch to</Text> */}

      <SearchBar placeholder={"Search for family member to add"} />

      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.householdsContainer}
          data={allUsers}
          renderItem={({ item }) => <UserSearchCard userInfo={item} />}
        />
      </View>
    </View>
  );
};

export default AddFamilyMemberModal;
