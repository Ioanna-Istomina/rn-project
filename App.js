import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { useState, useEffect, useCallback } from "react";
import Navigation from "./src/Screens/auth/Navigation";
import { View, StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Medium": require("./assets/font/Roboto-Medium.ttf"),
          "Roboto-Regular": require("./assets/font/Roboto-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      {isReady && (
        <Provider store={store}>
          <NavigationContainer>
            <View style={styles.container} onLayout={onLayoutRootView}>
              <Navigation />
            </View>
          </NavigationContainer>
        </Provider>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
