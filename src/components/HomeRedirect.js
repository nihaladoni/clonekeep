import { useAuthState } from "react-firebase-hooks/auth";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase/config";

const HomeRedirect = ({ children, ...OtherProps }) => {
  const [user] = useAuthState(auth);

  return (
    <Route
      {...OtherProps}
      render={() => (user ? <Redirect to="/home" /> : children)}
    />
  );
};

export default HomeRedirect;
