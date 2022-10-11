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

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [show, setShow] = useState(true);
  const [focusLogin, setFocusLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setShow(true);
  };

  const sentInitialState = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setstate(initialState);
    setShow(true);
  };

  const currentLoginStyle = focusLogin ? styles.focus : styles.formLogin;
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

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../img/background.jpg")}
        >
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.secondBackground}>
              <View style={styles.centerAvatar}>
                <View style={styles.border}>
                  <Text style={styles.plus}>+</Text>
                </View>
              </View>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 32 : 78,
                  width: dimensions,
                }}
              >
                <Text style={styles.headerTitle}>Registration</Text>
                <TextInput
                  style={currentLoginStyle}
                  onFocus={() => setFocusLogin(true)}
                  onBlur={() => setFocusLogin(false)}
                  placeholder="Login"
                  placeholderTextColor="#BDBDBD"
                  value={state.login}
                  onChangeText={(value) =>
                    setstate((prevState) => ({
                      ...prevState,
                      login: value.trim(),
                    }))
                  }
                />
                <TextInput
                  style={currentEmailStyle}
                  onFocus={() => setFocusEmail(true)}
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
                    onFocus={() => setFocusPassword(true)}
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
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <Text style={styles.textLink}>
                  Already have an account? Sign in
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
  centerAvatar: {
    position: "absolute",
    width: 120,
    height: 120,
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    top: -60,
    borderRadius: 16,
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
    marginBottom: 32,
  },
  form: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
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
