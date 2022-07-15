import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import FamilyMemberScreen from "../screens/FamilyMemberScreen/FamilyMemberScreen";
import AddChoreScreen from "../screens/AddChoreScreen/AddChoreScreen";
import AddFamilyMemberModal from "../screens/Modals/AddFamilyMemberModal/AddFamilyMemberModal";
import HouseholdsModal from "../screens/Modals/HouseholdsModal/HouseholdsModal";
import ProfileSettingsModal from "../screens/Modals/ProfileSettingsModal/ProfileSettingsModal";
import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import { useAuthContext } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();
const RootStack = createStackNavigator();

function ActivityIndicatorComponent() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} color={"gray"} />
    </View>
  );
}

export default function RootNavigator() {
  const { dbUser, sub } = useAuthContext();

  return (
    // <Stack.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    // >
    //   <Stack.Screen name="Home" component={RootStack} />
    // </Stack.Navigator>
    <RootStack.Navigator>
      <RootStack.Group>
        {/* <RootStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="FamilyMemberScreen"
          component={FamilyMemberScreen}
          options={{ headerShown: false }}
        /> */}
        {!dbUser ? (
          <RootStack.Screen
            name="ActivityIndicator"
            component={ActivityIndicatorComponent}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            {sub && dbUser ? (
              <>
                <RootStack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="ProfileScreen"
                  component={ProfileScreen}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <RootStack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{ headerShown: false }}
              />
            )}
          </>
        )}
        {/* 
        <RootStack.Screen
          name="FamilyMemberScreen"
          component={FamilyMemberScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="AddChoreScreen"
          component={AddChoreScreen}
          options={{ headerShown: false }}
        /> */}
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{ presentation: "modal", headerShown: false }}
      >
        <RootStack.Screen
          name="AddFamilyMemberModal"
          component={AddFamilyMemberModal}
        />
        <RootStack.Screen name="HouseholdsModal" component={HouseholdsModal} />
        <RootStack.Screen
          name="ProfileSettingsModal"
          component={ProfileSettingsModal}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="FamilyMemberScreen"
        component={FamilyMemberScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AddChoreScreen"
        component={AddChoreScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
