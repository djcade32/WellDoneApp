import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import FamilyMemberScreen from "../screens/FamilyMemberScreen/FamilyMemberScreen";
import AddChoreScreen from "../screens/AddChoreScreen/AddChoreScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeStackNavigator} />
    </Stack.Navigator>
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
