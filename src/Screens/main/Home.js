import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";

import { View, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Feather,
  Ionicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

import { TouchableWithoutFeedback } from "react-native";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => setactiveIcon(false)}>
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 83,
          },
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
          },
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
            fontFamily: "Roboto-Medium",
          },
        }}
      >
        <MainTab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="grid-outline"
                size={24}
                color={focused ? "#FF6C00" : "#212121CC"}
              />
            ),
            headerRight: () => (
              <MaterialIcons
                name="logout"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate("Login")}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Create Post"
          component={CreatePostsScreen}
          options={{
            tabBarStyle: { display: "none" },
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  ...styles.container,
                  backgroundColor: "#FF6C00",
                }}
              >
                <AntDesign name="plus" size={24} color="#fff" />
              </View>
            ),
            headerLeft: () => (
              <AntDesign
                name="arrowleft"
                size={24}
                color="#BDBDBD"
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate("Posts")}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={24}
                color={focused ? "#FF6C00" : "#212121CC"}
              />
            ),
            headerLeft: () => (
              <AntDesign
                name="arrowleft"
                size={24}
                color="#BDBDBD"
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate("Posts")}
              />
            ),
          }}
        />
      </MainTab.Navigator>
    </TouchableWithoutFeedback>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
