import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./styles";
import HouseholdCard from "../../../components/ModalComponents/HouseholdCard/HouseholdCard";
import userData from "../../../../assets/data/userData";

const USER = userData.User[0];

const HouseholdsModal = () => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Households</Text>
      <Text style={styles.modalSubTitle}>Tap household to switch to</Text>
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.householdsContainer}
          data={USER.householdIds}
          renderItem={() => <HouseholdCard />}
        />
      </View>
    </View>
  );
};

export default HouseholdsModal;
