import { ThemeProvider } from "@material-ui/styles";

import Brightness4OutlinedIcon from "@material-ui/icons/Brightness4Outlined";
import Brightness7TwoToneIcon from "@material-ui/icons/Brightness7TwoTone";
import Tooltip from "@material-ui/core/Tooltip";

import App from "./App";
import { useSession } from "./firebase/UserProvider";
import { Box, createMuiTheme } from "@material-ui/core";
import { useState } from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 200,
  },
}));

function RootApp() {
  const { setPrefs, prefs } = useSession();

  const [isDark, setIsDark] = useState(false);

  const themeConfig = createMuiTheme({
    palette: {
      secondary: {
        main: "#f4b701",
        light: "#f1f3f4",
      },

      type: isDark ? "dark" : "light",
    },
  });
  const classes = useStyles();

  const handleDarkMode = () => {
    setPrefs({ ...prefs, darkmode: !isDark });

    setIsDark((bool) => !bool);
  };

  const longText = `
  Email: cilego8268@donmah.com
  password : Test@123

`;
  return (
    <>
      <Tooltip title={longText} classes={{ tooltip: classes.customWidth }}>
        <Box position="fixed" bottom="10px" right="15px" zIndex="tooltip">
          <Fab size="small" aria-label="darkToggle" onClick={handleDarkMode}>
            {isDark ? <Brightness7TwoToneIcon /> : <Brightness4OutlinedIcon />}
          </Fab>
        </Box>
      </Tooltip>

      <ThemeProvider theme={themeConfig}>
        <App />
      </ThemeProvider>
    </>
  );
}

export default RootApp;
