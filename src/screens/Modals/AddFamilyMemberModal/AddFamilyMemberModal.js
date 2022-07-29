import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import SearchBar from "../../../components/SearchBar/SearchBar";
import UserSearchCard from "../../../components/ModalComponents/UserSearchCard/UserSearchCard";
import { useRoute } from "@react-navigation/native";

const AddFamilyMemberModal = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const route = useRoute();
  const allUsers = route.params;

  useEffect(() => {
    console.log("Search Value: ", searchValue);
    setSearchedUsers(
      allUsers.filter((user) => {
        const name = user.firstName + " " + user.lastName;
        if (name.includes(searchValue)) {
          return user;
        }
      })
    );
  }, [searchValue]);

  return (
    <View style={styles.modalContainer}>
      <SearchBar
        placeholder={"Search for family member to add"}
        setSearchValue={setSearchValue}
      />

      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.householdsContainer}
          data={searchedUsers}
          renderItem={({ item }) => <UserSearchCard userInfo={item} />}
        />
      </View>
    </View>
  );
};

export default AddFamilyMemberModal;
