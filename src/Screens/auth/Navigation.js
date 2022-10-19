import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { authStateChangeUser } from "../../redux/auth/authOperations";
import { useRoute } from "../../router";

const AuthStack = createNativeStackNavigator();

const Navigation = () => {
  const { state } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [state]);

  const routing = useRoute(state);
  return (
    <View style={styles.container}>
      <AuthStack.Navigator>{routing}</AuthStack.Navigator>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
