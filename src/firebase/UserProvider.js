import React, { createContext, useContext, useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import useLocalStorage from "../utils/useLocal";
import { auth, db } from "./config";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [value, notesLoading, notesError] = useDocumentData(
    db.doc(`users/${user?.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [prefs, setPrefs] = useLocalStorage("userPref", {
    darkmode: false,
    cardCount: null,
  });

  const [session, setSession] = useState({
    userLoading: true,
    user: null,
    userError: null,
    notes: null,
    notesLoading: true,
    notesError: null,
  });

  useEffect(() => {
    if (user) {
      setSession({
        userLoading,
        user,
        userError,
        notes: value && value.notes.sort((a, b) => b.createdAt - a.createdAt),
        notesLoading,
        notesError,
        prefs,
        setPrefs,
      });
    } else {
      setSession({
        userLoading,
        user: null,
        userError,
        notes: null,
        notesLoading,
        notesError,
        prefs,
        setPrefs,
      });
    }
  }, [user, userLoading, userError, value, notesLoading, notesError, prefs]);

  return (
    <UserContext.Provider value={session}>
      {!session.loading && children}
    </UserContext.Provider>
  );
};
export default UserProvider;

export const useSession = () => {
  const user = useContext(UserContext);

  return user;
};
