import { useState } from "react";

export const themeObj = {
  palette: {
    secondary: {
      main: "#f4b701",
      light: "#f1f3f4",
    },

    type: "light",
  },
};

export const useDarkMode = (mode = null) => {
  const [theme, setTheme] = useState();

  const toggleDarkMode = () => {
    const updatedTheme = {
      ...themeObj,
      palette: {
        ...themeObj.palette,
        type: mode,
      },
    };
    setTheme(updatedTheme);
  };
  return [theme, toggleDarkMode];
};
