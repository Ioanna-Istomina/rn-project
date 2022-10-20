import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUpUser = async ({ email, password, login }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password, login);
    await updateProfile(auth.currentUser, {
      displayName: login,
    });
    const updatedUser = auth.currentUser;
    return updatedUser;
  } catch (error) {
    alert(error.message);
  }
};

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getSatte) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateProfile({
            userId: user.uid,
            login: user.displayName,
            email: user.email,
          })
        );
        dispatch(authSlice.actions.authStateChange({ state: true }));
      } else {
      }
    });
  } catch (error) {
    alert(error.message);
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authLogOut());
  } catch (error) {
    alert(error.message);
  }
};
