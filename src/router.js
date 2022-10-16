import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/main/Home";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

const AuthStack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />
      </>
    );
  }
  return (
    <AuthStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
  );
};
