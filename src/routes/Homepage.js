import { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import "./homepage.css";

import TitleBar from "../components/TitleBar";
import MyCard from "../components/MyCard";
import Masonry from "react-masonry-css";

import NoteInput from "../components/NoteInput";
import { auth, db } from "../firebase/config";
import { updateUserDocument, updateUserNotes } from "../firebase/user";

import uniqid from "uniqid";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSession } from "../firebase/UserProvider";

import DeleteIcon from "@material-ui/icons/Delete";

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

const Homepage = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [showTitle, setShowTitle] = useState(false);
  const [cardId, setCardId] = useState(null);
  const { notes, notesLoading, prefs } = useSession();

  const [user] = useAuthState(auth);

  // console.log(prefs);

  // handlers

  const handleDeleteNote = async (e, id) => {
    e.stopPropagation();
    const updatedNotes = notes.filter((note) => note.id !== id);
    await updateUserNotes({ uid: user.uid, updatedNotes });
  };
  const handleCardClick = (e, id) => {
    e.nativeEvent.stopImmediatePropagation();
    setCardId(id);
  };

  const handleAddNote = async () => {
    setShowTitle(false);
    if (formData.title || formData.content) {
      const form = {
        id: uniqid(),
        title: formData.title,
        content: formData.content,
        createdAt: Date.now(),
      };
      setFormData({ title: "", content: "" });

      await updateUserDocument({
        uid: user.uid,
        form,
      });
    } else {
      setFormData({ title: "", content: "" });
    }
  };

  const handleUpdatedNote = (newObj) => {
    newObj.id = cardId;

    const remainingNotes = notes.filter((note) => note.id !== cardId);
    const docRef = db.doc(`users/${user.uid}`);
    docRef.update({
      notes: [...remainingNotes, newObj],
    });
  };

  const skeletonContent = notesLoading && (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {Array(prefs?.cardCount)
        .fill({
          title: "",
          content: "",
        })
        .map((item, idx) => (
          <MyCard
            key={idx}
            icon={<Skeleton animation="wave" />}
            title={<Skeleton animation="wave" />}
            content={<Skeleton animation="wave" />}
          />
        ))}
    </Masonry>
  );

  return (
    <div>
      <TitleBar />

      <div className="home" onClick={handleAddNote}>
        <NoteInput
          formData={formData}
          setFormData={setFormData}
          showTitle={showTitle}
          setShowTitle={setShowTitle}
        />

        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes &&
            notes.map((item) => (
              <MyCard
                key={item.id}
                onDeleteNote={handleDeleteNote}
                onCardUpdate={handleUpdatedNote}
                onCardClick={handleCardClick}
                icon={<DeleteIcon />}
                {...item}
              />
            ))}
        </Masonry>
        {skeletonContent}
      </div>
    </div>
  );
};

export default Homepage;
