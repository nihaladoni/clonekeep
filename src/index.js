import React from "react";
import ReactDOM from "react-dom";
import UserProvider from "./firebase/UserProvider";
import RootApp from "./RootApp";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <RootApp />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
