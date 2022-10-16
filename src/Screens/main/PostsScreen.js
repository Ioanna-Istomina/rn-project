import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";

import userPhoto from "../../img/user.jpg";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image style={styles.userPhoto} source={userPhoto} />
        <View style={styles.userData}>
          <Text style={styles.name}>Ioanna Istomina</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{ ...styles.containerImg, width: 343, marginBottom: 32 }}
          >
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.imgTitle}>{item.name}</Text>
            <View style={styles.commentContainer}>
              <TouchableOpacity style={styles.comment}>
                <EvilIcons name="comment" size={24} color="#BDBDBD" />
                <Text style={styles.commentNumber}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.location}>
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
    height: 343,
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
