import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome, SimpleLineIcons, AntDesign } from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [_, setHasCameraPermission] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [photoLocation, setPhotoLocation] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { userId, login } = useSelector((state) => state.auth);
  const photoRepeater = () => {
    setPhoto(null);
  };

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      const cameraStatus = await Camera.getCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();

    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setPhotoLocation(coords);
    setPhoto(photo.uri);
  };

  const inputName = (text) => {
    setName(text);
  };

  const inputLocation = (text) => {
    setLocation(text);
  };

  const reset = () => {
    setName("");
    setLocation("");
    setPhoto(null);
  };

  const handleClick = async () => {
    try {
      Keyboard.dismiss();
      if (!name && !location && !photo) {
        return;
      }
      setIsShowKeyboard(false);
      await createPost();
      navigation.navigate("Posts", {
        photo,
        name: name.trim(),
        location: location.trim(),
        photoLocation,
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const postId = Date.now().toString();
      const storageRef = await ref(storage, `posts/${postId}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const locationStorage = await Location.getCurrentPositionAsync({});
      return { photoURL, locationStorage };
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async () => {
    try {
      const { photoURL, locationStorage } = await uploadPhotoToServer();
      await addDoc(collection(db, "posts"), {
        photoURL,
        locationStorage,
        name,
        location,
        userId,
        login,
        comments: 0,
        likes: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              marginBottom: !isShowKeyboard ? 20 : 80,
              justifyContent: "center",
              marginHorizontal: 16,
            }}
          >
            <Camera
              style={styles.camera}
              ref={setCamera}
              onCameraReady={onCameraReady}
            >
              {photo ? (
                <View style={styles.photoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{ height: 240, width: 343 }}
                  />
                  <View
                    style={{
                      ...styles.cameraIconStyle,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: -30,
                      marginStart: -30,
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <FontAwesome
                      name="camera"
                      size={24}
                      style={{ color: "#BDBDBD" }}
                    />
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.cameraIconStyle}
                >
                  <FontAwesome
                    name="camera"
                    size={24}
                    style={{ color: "#BDBDBD" }}
                  />
                </TouchableOpacity>
              )}
            </Camera>
            {photo ? (
              <Text style={styles.text} onPress={photoRepeater}>
                Edit photo
              </Text>
            ) : (
              <Text style={styles.text}>Upload a photo</Text>
            )}
            <View>
              <TextInput
                style={styles.inputName}
                placeholder="Title..."
                value={name}
                name="name"
                onChangeText={inputName}
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => setIsShowKeyboard(false)}
              />
              <View style={styles.containerInput}>
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  color="#BDBDBD"
                  style={styles.iconLocation}
                />
                <TextInput
                  style={styles.inputLocation}
                  placeholder="Location..."
                  value={location}
                  name="location"
                  onChangeText={inputLocation}
                  onFocus={() => setIsShowKeyboard(true)}
                  onBlur={() => setIsShowKeyboard(false)}
                />
              </View>
            </View>
            {photo && location && name ? (
              <TouchableOpacity
                style={{
                  ...styles.buttonContainer,
                  backgroundColor: "#FF6C00",
                }}
                onPress={handleClick}
              >
                <Text style={{ ...styles.textButton, color: "#fff" }}>
                  Publish
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.textButton}>Publish</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
        {!isShowKeyboard && (
          <View style={styles.footer}>
            <TouchableHighlight style={styles.delete} onPress={reset}>
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableHighlight>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  camera: {
    height: 240,
    width: 343,
    marginTop: Platform.OS === "ios" ? 16 : 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  cameraIconStyle: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 240,
    width: 343,
  },
  text: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 8,
    color: "#BDBDBD",
    marginStart: 16,
  },
  inputName: {
    width: "100%",
    height: 50,
    marginTop: 29,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  iconLocation: {
    position: "absolute",
    bottom: 16,
  },
  inputLocation: {
    width: "100%",
    height: 50,
    marginTop: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingLeft: 28,
  },
  textButton: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  buttonContainer: {
    width: "100%",
    height: 51,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 29,
  },
  footer: {
    height: 83,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: Platform.OS === "ios" ? 0 : 50,
  },
  delete: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreatePostsScreen;
