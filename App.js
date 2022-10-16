import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "./src/router";

SplashScreen.preventAutoHideAsync();
const AuthStack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/font/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/font/Roboto-Regular.ttf"),
  });

  const routing = useRoute({});

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AuthStack.Navigator>{routing}</AuthStack.Navigator>
      </View>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
