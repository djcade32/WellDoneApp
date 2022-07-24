import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./styles";
import HouseholdCard from "../../../components/ModalComponents/HouseholdCard/HouseholdCard";
import userData from "../../../../assets/data/userData";
import { useAuthContext } from "../../../contexts/AuthContext";

const USER = userData.User[0];

const HouseholdsModal = () => {
  const { dbUser } = useAuthContext();

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Households</Text>
      <Text style={styles.modalSubTitle}>Tap to switch household</Text>
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.householdsContainer}
          data={dbUser?.householdIds}
          renderItem={({ item }) => <HouseholdCard householdId={item} />}
        />
      </View>
    </View>
  );
};

export default HouseholdsModal;
