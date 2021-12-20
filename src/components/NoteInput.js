import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      maxWidth: "90ch",
      padding: "12px 16px",
    },
  },

  container: {
    marginTop: theme.spacing(12),
    fontWeight: 700,
  },
  mypaper: {
    borderRadius: "10px",
    "&:hover": {
      boxShadow:
        "0 1px 1px 0 rgba(65,69,73,0.3),0 1px 3px 1px rgba(65,69,73,0.15)",
    },
  },

  noteTitleShow: {
    display: "block",
  },
  noteTitleHide: {
    display: "none",
  },
}));

const NoteInput = (props) => {
  const classes = useStyles();

  const myClass = props.showTitle
    ? classes.noteTitleShow
    : classes.noteTitleHide;

  const handleContentFocus = (e) => {
    e.stopPropagation();

    props.setShowTitle(true);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      alignContent="center"
      wrap="nowrap"
      className={classes.container}
    >
      <Grid item md={5} xs={11}>
        <Paper className={classes.mypaper} style={{}}>
          <Box className={classes.root} autoComplete="off">
            <TextField
              placeholder="Title"
              InputProps={{ disableUnderline: true }}
              onChange={(e) => {
                e.stopPropagation();
                props.setFormData({
                  ...props.formData,
                  title: e.target.value,
                });
              }}
              onClick={handleContentFocus}
              className={myClass}
              multiline
              name="title"
              fullWidth
              value={props.formData.title}
            />

            <TextField
              placeholder="Take a note..."
              multiline
              fullWidth
              name="content"
              value={props.formData.content}
              onChange={(e) => {
                e.stopPropagation();
                props.setFormData({
                  ...props.formData,
                  content: e.target.value,
                });
              }}
              InputProps={{
                classes: { input: classes.myinput },
                disableUnderline: true,
              }}
              onClick={handleContentFocus}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NoteInput;
