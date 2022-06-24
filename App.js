import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import Colors from "./src/constants/Colors";
import BgImage from "./assets/images/bgImage.png";
import FamilyMemberScreen from "./src/screens/FamilyMemberScreen/FamilyMemberScreen";

// Loading fonts
function fetchFonts() {
  return Font.loadAsync({
    poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await fetchFonts();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ImageBackground
      source={BgImage}
      resizeMode="cover"
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <SafeAreaView>
        {/* <HomeScreen /> */}
        <FamilyMemberScreen />
      </SafeAreaView>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
