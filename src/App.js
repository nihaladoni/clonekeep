import { BrowserRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Homepage from "./routes/Homepage";
import LandingPage from "./routes/Landing";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./routes/ErrorPage";
import HomeRedirect from "./components/HomeRedirect";
import SearchCard from "./routes/Search";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <HomeRedirect exact path="/">
          <LandingPage />
        </HomeRedirect>
        <PrivateRoute path="/home">
          <Homepage />
        </PrivateRoute>
        <PrivateRoute exact path="/search">
          <SearchCard />
        </PrivateRoute>

        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
