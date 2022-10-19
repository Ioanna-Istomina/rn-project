import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/config";

import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";

import userPhoto from "../../img/user.jpg";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { email, login } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const photoRequest = await getDocs(collection(db, "posts"));
    let newPosts = [];
    photoRequest.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPosts(newPosts);
  };

  useEffect(() => {
    getAllPosts();
  }, [posts]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image style={styles.userPhoto} source={userPhoto} />
        <View style={styles.userData}>
          <Text style={styles.name}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
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
                  <FontAwesome name="comment-o" size={24} color="#BDBDBD" />
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
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  userContainer: {
    width: 343,
    flexDirection: "row",
    marginBottom: 32,
    marginStart: 16,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userData: {
    marginLeft: 8,
    justifyContent: "center",
  },
  name: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },
  email: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
    color: "rgba(33, 33, 33, 0.8)",
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
});

export default PostsScreen;
