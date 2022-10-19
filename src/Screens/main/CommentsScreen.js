import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShownKeybord, setIsShownKeybord] = useState(false);

  const { id, photo } = route.params;
  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, [comment, id]);

  const getAllComments = async () => {
    const commentRequest = await getDocs(
      collection(db, "posts", `${id}`, "comments")
    );
    let allComments = [];
    commentRequest.forEach((doc) => {
      allComments.push({ ...doc.data(), id: doc.id });
    });
    setAllComments(allComments);
  };

  const addComment = async () => {
    if (comment.trim().length === 0) {
      return;
    }
    try {
      const date = new Date().toLocaleString();
      Keyboard.dismiss();
      setIsShownKeybord(false);
      await addDoc(collection(db, "posts", `${id}`, "comments"), {
        comment,
        login,
        userId,
        date,
      });
      await updateDoc(doc(db, "posts", `${id}`), {
        comments: increment(1),
      });
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Image source={{ uri: photo }} style={styles.img} />
        </View>
        <FlatList
          style={{ marginBottom: 10 }}
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: item.userId === userId ? "row" : "row-reverse",
              }}
            >
              <View
                style={{
                  ...styles.commentContainer,
                  backgroundColor:
                    item.userId === userId
                      ? "rgba(255, 108, 0, 0.15)"
                      : "rgba(0, 0, 0, 0.03)",
                }}
              >
                <Text style={styles.text}>{item?.comment}</Text>
                <Text
                  style={{
                    ...styles.textDate,
                    textAlign: item.userId === userId ? "left" : "right",
                  }}
                >
                  {item?.date}
                </Text>
              </View>
            </View>
          )}
        ></FlatList>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
        >
          <View
            style={{
              marginBottom: !isShownKeybord ? 16 : 32,
            }}
          >
            <TextInput
              style={styles.commentInput}
              placeholder=" Сomment..."
              onChangeText={setComment}
              value={comment}
              name="Comment"
              onFocus={() => setIsShownKeybord(true)}
              onBlur={() => setIsShownKeybord(false)}
            ></TextInput>
            <TouchableOpacity style={styles.button} onPress={addComment}>
              <AntDesign name="arrowup" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },

  commentContainer: {
    width: 300,
    minHeight: 37,
    borderRadius: 4,
    padding: 16,
    marginBottom: 24,
  },
  img: {
    height: 240,
    borderRadius: 16,
    marginBottom: 32,
    marginTop: 32,
  },
  commentInput: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    paddingRight: 8,
    paddingLeft: 16,
  },
  button: {
    position: "absolute",
    right: 8,
    top: 8,
    height: 34,
    width: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    marginBottom: 8,
  },
  textDate: {
    color: "#BDBDBD",
    fontSize: 10,
    lineHeight: 12,
  },
});
