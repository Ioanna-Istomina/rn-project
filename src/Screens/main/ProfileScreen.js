import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase/config";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import userPhoto from "../../img/user.jpg";
import {
  SimpleLineIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { login, userId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, [navigation]);

  const getUserPosts = async () => {
    const queryUser = query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(queryUser);
    let newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPosts(newPosts);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../img/background.jpg")}
      >
        <View style={styles.secondBackground}>
          <MaterialIcons
            name="logout"
            size={24}
            color="#BDBDBD"
            style={styles.logoutButton}
            onPress={() => dispatch(authSignOutUser())}
          />
          <View style={styles.centerAvatar}>
            <Image style={styles.userPhoto} source={userPhoto} />
            <View style={styles.border}>
              <Text style={styles.plus}>x</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>{login}</Text>

          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <View style={{ width: 343, marginBottom: 32 }}>
                  <Image source={{ uri: item.photoURL }} style={styles.image} />
                  <Text style={styles.imgTitle}>{item.name}</Text>
                  <View style={styles.commentContainer}>
                    <TouchableOpacity
                      style={styles.comment}
                      onPress={() => {
                        navigation.navigate("CommentsScreen", {
                          photo: item.photoURL,
                          id: item.id,
                        });
                      }}
                    >
                      {item.comments === 0 ? (
                        <FontAwesome
                          name="comment-o"
                          size={24}
                          color="#BDBDBD"
                        />
                      ) : (
                        <FontAwesome name="comment" size={24} color="#FF6C00" />
                      )}
                      <Text
                        style={{
                          ...styles.commentNumber,
                          color: item.comments === 0 ? "#BDBDBD" : "black",
                        }}
                      >
                        {item.comments}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.location}
                      onPress={() => {
                        navigation.navigate("MapScreen", {
                          location: item.locationStorage.coords,
                        });
                      }}
                    >
                      <SimpleLineIcons
                        name="location-pin"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={styles.locationTitle}>{item.location}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  secondBackground: {
    height: 450,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  centerAvatar: {
    position: "absolute",
    width: 120,
    height: 120,
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    top: -60,
    borderRadius: 16,
  },
  border: {
    position: "absolute",
    width: 25,
    height: 25,
    bottom: 14,
    right: -12.5,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    color: "#E8E8E8",
    fontSize: 22,
    lineHeight: 23,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 80,
    marginBottom: 20,
  },
  image: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  imgTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    marginTop: 8,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentNumber: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    marginLeft: 6,
  },
  comment: {
    marginTop: 8,
    width: 50,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    minWidth: 100,
    marginTop: 8,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  locationTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    textDecorationLine: "underline",
    marginStart: 4,
  },
  logoutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
});

export default ProfileScreen;
