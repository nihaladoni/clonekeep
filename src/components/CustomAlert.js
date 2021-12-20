import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

const CustomAlert = ({ open, type, message, onClose }) => {
  let msg = "";
  if (type === "error") {
    switch (message.code) {
      case "auth/email-already-in-use":
        msg = "Email already registered. Please login using this email.";
        break;
      case "auth/user-not-found":
        msg = "Email not registered. Please register.";
        break;
      case "auth/wrong-password":
        msg = "Wrong password. Enter correct password.";
        break;
      default:
        msg = "Something went wrong.";
        break;
    }
  }

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <MuiAlert elevation={6} variant="filled" severity={type}>
        {type === "error" ? msg : message}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomAlert;
