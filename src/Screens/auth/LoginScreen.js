import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { authSignInUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [show, setShow] = useState(true);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setShow(true);
  };

  const sentInitialState = ({ navigation }) => {
    if (!state.email && !state.password) {
      return;
    }
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setstate(initialState);
    dispatch(authSignInUser(state));
    setShow(true);
  };

  const currentEmailStyle = focusEmail ? styles.focus : styles.formLogin;
  const currentPasswordStyle = focusPassword ? styles.focus : styles.formLogin;

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  const clickShowPassword = () => {
    if (show) {
      return setShow(false);
    }
    return setShow(true);
  };

  useEffect(() => {
    const hideKeybord = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      hideKeybord.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../../img/background.jpg")}
        >
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.secondBackground}>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 32 : 200,
                  width: dimensions,
                }}
              >
                <Text style={styles.headerTitle}>Login</Text>
                <TextInput
                  style={currentEmailStyle}
                  onFocus={() => {
                    setFocusEmail(true);
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => setFocusEmail(false)}
                  placeholder="Email"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({
                      ...prevState,
                      email: value.trim(),
                    }))
                  }
                />
                <View>
                  <TextInput
                    style={currentPasswordStyle}
                    onFocus={() => {
                      setFocusPassword(true);
                      setIsShowKeyboard(true);
                    }}
                    onBlur={() => setFocusPassword(false)}
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={show}
                    value={state.password}
                    onChangeText={(value) =>
                      setstate((prevState) => ({
                        ...prevState,
                        password: value.trim(),
                      }))
                    }
                  />
                  <Text onPress={clickShowPassword} style={styles.showPassword}>
                    Show
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.6}
                  onPress={sentInitialState}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <Text
                  style={styles.textLink}
                  onPress={() => navigation.navigate("Registration")}
                >
                  Don't have an account? Register
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    height: 549,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 32,
  },
  form: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
    justifyContent: "flex-end",
  },
  formLogin: {
    height: 50,
    width: 343,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    padding: 16,
    marginBottom: 16,
  },

  focus: {
    height: 50,
    width: 343,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    padding: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 27,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  textLink: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
  },

  showPassword: {
    position: "absolute",
    bottom: 32,
    right: 16,
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  border: {
    position: "absolute",
    width: 25,
    height: 25,
    bottom: 14,
    right: -12.5,
    borderRadius: 50,
    borderColor: "#FF6C00",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    color: "#FF6C00",
    fontSize: 24,
    lineHeight: 25,
  },
});
