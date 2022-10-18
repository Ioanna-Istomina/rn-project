import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";

import { View, StyleSheet, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Feather,
  Ionicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

import { TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
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
                onPress={() => dispatch(authSignOutUser())}
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
        <MainTab.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            title: "Map Screen",
            headerTitleAlign: "center",
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
            headerLeft: () => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.arrow}
                  onPress={() => navigation.navigate("Posts")}
                >
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color="rgba(33, 33, 33, 0.8)"
                  />
                </TouchableOpacity>
              );
            },
          }}
        />
        <MainTab.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{
            headerTitleAlign: "center",
            title: "Comments",
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
            headerLeft: () => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.arrow}
                  onPress={() => navigation.navigate("Posts")}
                >
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color="rgba(33, 33, 33, 0.8)"
                  />
                </TouchableOpacity>
              );
            },
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
  arrow: {
    marginLeft: 16,
    width: 24,
    height: 24,
  },
});
