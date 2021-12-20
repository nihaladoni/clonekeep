import { useState } from "react";
import Masonry from "react-masonry-css";

import MyCard from "../components/MyCard";
import TitleBar from "../components/TitleBar";
import { db } from "../firebase/config";
import { updateUserNotes } from "../firebase/user";
import { useSession } from "../firebase/UserProvider";
import "./homepage.css";

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

const SearchCard = () => {
  const [tempTerm, setTempTerm] = useState("");
  const { notes, user } = useSession();
  const [tempDoc, setTempDoc] = useState();
  const [cardId, setCardId] = useState(null);

  const handleSearchChange = async (term) => {
    setTempTerm(term);
    if (tempTerm !== "") {
      const filteredArr = notes?.filter(
        (note) => note.content.includes(term) || note.title.includes(term)
      );

      setTempDoc({ notes: filteredArr });
    } else {
      setTempDoc(null);
    }
  };

  const handleUpdatedNote = (newObj) => {
    newObj.id = cardId;

    const remainingNotes = notes.filter((note) => note.id !== cardId);
    const docRef = db.doc(`users/${user.uid}`);

    if (tempTerm !== "") {
      setTempDoc({ ...tempDoc, notes: [newObj] });
    }
    docRef.update({
      notes: [...remainingNotes, newObj],
    });
  };

  const handleDeleteNote = async (e, id) => {
    e.stopPropagation();
    const updatedNotes = notes.filter((note) => note.id !== id);
    await updateUserNotes({ uid: user.uid, updatedNotes });
    setTempDoc(updatedNotes);
  };
  const handleCardClick = (e, id) => {
    setCardId(id);
  };

  return (
    <div>
      <TitleBar onSearchChange={handleSearchChange} />
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid mymason"
        columnClassName="my-masonry-grid_column"
      >
        {tempDoc &&
          tempDoc.notes?.map((item) => (
            <MyCard
              key={item.id}
              onDeleteNote={handleDeleteNote}
              onCardUpdate={handleUpdatedNote}
              onCardClick={handleCardClick}
              {...item}
            />
          ))}
      </Masonry>
    </div>
  );
};

export default SearchCard;
