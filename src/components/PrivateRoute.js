import { useAuthState } from "react-firebase-hooks/auth";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase/config";

import { useSession } from "../firebase/UserProvider";
import MyBackdrop from "./Backdrop";

const PrivateRoute = ({ children, ...OtherProps }) => {
  const [user] = useAuthState(auth);

  const { userLoading } = useSession();

  return userLoading ? (
    <MyBackdrop isHidden={true} />
  ) : (
    <Route
      {...OtherProps}
      render={() => (user ? children : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
