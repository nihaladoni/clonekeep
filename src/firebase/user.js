import { db, timestamp } from "./config";
import firebase from "firebase/app";

export const createUserDocument = async (user) => {
  const docRef = db.doc(`users/${user.uid}`);

  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    notes: [],
  };

  return docRef.set({
    profileCreated: timestamp,

    ...userProfile,
  });
};

export const updateUserDocument = async (data) => {
  const docRef = db.doc(`users/${data.uid}`);
  return docRef.update({
    notes: firebase.firestore.FieldValue.arrayUnion({
      ...data.form,
    }),
  });
};
export const updateUserNotes = async ({ uid, updatedNotes }) => {
  const docRef = db.doc(`users/${uid}`);
  return docRef.update({
    notes: updatedNotes,
  });
};
