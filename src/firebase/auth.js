import { auth, googleProvider } from "./config";
import { createUserDocument } from "./user";

export const createAccountUsingEmail = async (props) => {
  const { fName, lName, email, password } = props;
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  await user.updateProfile({ displayName: `${fName} ${lName}` });
  createUserDocument(user);
  return user;
};

export const signInWithGoogle = () => {
  const { user } = auth.signInWithPopup(googleProvider);
  createUserDocument(user);
};

export const signInUsingEmail = async ({ email, password }) => {
  await auth.signInWithEmailAndPassword(email, password);
};
