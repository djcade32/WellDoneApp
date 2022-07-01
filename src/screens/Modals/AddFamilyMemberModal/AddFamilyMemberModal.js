import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./styles";
import SearchBar from "../../../components/SearchBar/SearchBar";
import userData from "../../../../assets/data/userData";
import UserSearchCard from "../../../components/ModalComponents/UserSearchCard/UserSearchCard";

const USER = userData.User;

const AddFamilyMemberModal = () => {
  return (
    <View style={styles.modalContainer}>
      {/* <Text style={styles.modalTitle}>Add Family Member</Text>
      <Text style={styles.modalSubTitle}>Tap household to switch to</Text> */}

      <SearchBar placeholder={"Search for family member to add"} />

      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.householdsContainer}
          data={[...Array(10)]}
          renderItem={() => <UserSearchCard />}
        />
      </View>
    </View>
  );
};

export default AddFamilyMemberModal;
