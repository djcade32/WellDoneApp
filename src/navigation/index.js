import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import FamilyMemberScreen from "../screens/FamilyMemberScreen/FamilyMemberScreen";
import AddChoreScreen from "../screens/AddChoreScreen/AddChoreScreen";
import AddFamilyMemberModal from "../screens/Modals/AddFamilyMemberModal/AddFamilyMemberModal";
import HouseholdsModal from "../screens/Modals/HouseholdsModal/HouseholdsModal";
import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import { useAuthContext } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();
const RootStack = createStackNavigator();

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
        {sub && dbUser ? (
          <RootStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <RootStack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
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
