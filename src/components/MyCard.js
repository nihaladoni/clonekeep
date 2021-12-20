import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

// icons

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    margin: "6px",
    width: "96%",
    borderRadius: "10px",
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.03, 1.03, 0.5)",
      cursor: "pointer",
      border: "1px solid grey",
    },
  },

  dialogRoot: {
    minWidth: "550px",
    height: "auto",
    position: "relative",
  },
  dialogTitle: {
    position: "fixed",
    fontWeight: "500",
    zIndex: "10",
    maxWidth: "550px",
    borderRadius: "10px",
    top: "25vh",
    left: "30vw",
    right: "25vw",
    backgroundColor: theme.palette.background.paper,
  },

  myInputTitle: {
    wordSpacing: "20px",
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: "1.5em",
  },
  myInputContent: {
    wordSpacing: "20px",
    fontSize: theme.typography.body1.fontSize,
    lineHeight: "1.5em",
  },
}));

const MyCard = ({
  img = null,
  title,
  content,
  id,
  onDeleteNote,
  onCardUpdate,
  onCardClick,
  icon,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleOpen = (e, id) => {
    e.nativeEvent.stopImmediatePropagation();
    setOpen(true);
    onCardClick(e, id);
  };

  const handleClose = () => {
    setOpen(false);

    //  Checking for title and content change
    if (title === newTitle && content === newContent) {
      return null;
    } else {
      const updatedNote = { title: newTitle, content: newContent };

      onCardUpdate(updatedNote);
    }
  };

  const card = (
    <Card
      className={classes.cardWrapper}
      variant="outlined"
      onClick={(e) => handleOpen(e, id)}
      style={{
        height: "min-content",
      }}
    >
      {img && <CardHeader></CardHeader>}
      <CardContent>
        <Typography
          variant="h6"
          color="textPrimary"
          style={{ wordWrap: "break-word" }}
          paragraph
          gutterBottom
        >
          {title}
        </Typography>
        <Typography color="textSecondary" style={{ wordWrap: "break-word" }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions style={{ height: "40px" }}>
        <IconButton onClick={(e) => onDeleteNote(e, id)}>{icon}</IconButton>
      </CardActions>
    </Card>
  );

  return (
    <>
      {card}
      <Grid container>
        <Grid item xs={12}>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            className={classes.dialogRoot}
          >
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
              <TextField
                InputProps={{
                  className: classes.myInputTitle,
                  disableUnderline: true,
                }}
                onChange={(e) => setNewTitle(e.target.value)}
                fullWidth
                value={newTitle}
                multiline
              />

              <TextField
                InputProps={{
                  className: classes.myInputContent,
                  disableUnderline: true,
                }}
                onChange={(e) => setNewContent(e.target.value)}
                value={newContent}
                multiline
                fullWidth
              />

              <IconButton onClick={(e) => onDeleteNote(e, id)}>
                {icon}
              </IconButton>
            </DialogTitle>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};

export default MyCard;
