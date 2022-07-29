import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import HouseholdCard from "../../../components/ModalComponents/HouseholdCard/HouseholdCard";
import userData from "../../../../assets/data/userData";
import { useAuthContext } from "../../../contexts/AuthContext";
import CreateHouseholdButton from "../../../components/ModalComponents/HouseholdCard/CreateHouseholdButton/CreateHouseholdButton";
import Colors from "../../../constants/Colors";
import { useHouseholdContext } from "../../../contexts/HouseholdContext";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const HouseholdsModal = () => {
  const navigation = useNavigation();
  const { dbUser } = useAuthContext();
  const { createHousehold } = useHouseholdContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newHouseholdName, setNewHouseholdName] = useState("");
  const [householdNameError, setHouseholdNameError] = useState(false);

  function handleCreateNewHousehold() {
    if (newHouseholdName.trim().length === 0) {
      setHouseholdNameError(true);
      return;
    }
    try {
      createHousehold(newHouseholdName);
      navigation.goBack();
      setShowSuccessModal(true);
      setModalVisible(false);
    } catch (err) {
      console.log("Error creating new household: ", err);
    }

    setNewHouseholdName("");
  }

  return (
    <View style={styles.modalContainer}>
      <Modal
        onShow={() => {
          setTimeout(() => {
            setShowSuccessModal(false);
          }, 200);
        }}
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.modalView}>
            <Text style={{ fontFamily: "poppins", fontSize: 16 }}>
              Household Created!
            </Text>
          </View>
        </View>
      </Modal>
      {/* Modal to give new household name */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={[styles.modalView, { width: "70%" }]}>
            <Text style={styles.modalTitle}>Household Name</Text>
            <TextInput
              onChangeText={(value) => {
                setNewHouseholdName(value);
              }}
              placeholder="Give household a name"
              returnKeyType="done"
              selectionColor={Colors.textColor}
              style={{
                fontFamily: "poppins",
                fontSize: 16,
                borderBottomColor: Colors.darkGray,
                borderBottomWidth: 1,
                width: "100%",
                color: Colors.textColor,
                textAlign: "center",
              }}
            />
            {householdNameError && (
              <Text style={styles.errorMessage}>
                Must give household a name
              </Text>
            )}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setModalVisible(false);
                  setHouseholdNameError(false);
                }}
                style={{
                  backgroundColor: Colors.darkGray,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "poppins",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleCreateNewHousehold}
                style={{
                  backgroundColor: Colors.darkGreen,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "poppins",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          position: "absolute",
          top: 25,
          left: 25,
          alignItems: "center",
          // flexDirection: "row",
        }}
      >
        <FontAwesome name="send" size={24} color="white" />
        <Text style={styles.householdModalSubTitle}>Invites</Text>
      </View>
      <Text style={styles.householdModalTitle}>Households</Text>
      <Text style={styles.householdModalSubTitle}>Tap to switch household</Text>
      <View style={styles.contentContainer}>
        <FlatList
          ListHeaderComponent={
            <CreateHouseholdButton setModalVisible={setModalVisible} />
          }
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
