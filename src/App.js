import Explore from "./Pages/Explore";
import Login from "./Pages/Login";
import Alerts from "./Pages/Alerts";
import Register from "./Pages/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";

// const verifyURL = "http://localhost:4000/auth/is-verify";
const verifyURL = "https://evening-plateau-74700.herokuapp.com/is-verify";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    if (!localStorage.token) return;
    (async () => {
      const response = await fetch(verifyURL, {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      }).then((res) => res.json());
      if (response === true) setIsAuthenticated(true);
    })();
  });

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Explore />} />
          <Route
            exact
            path="/Register"
            render={() => !isAuthenticated
              ? <Register toggleAuth={toggleAuth} />
              : <Redirect to="/alerts" />
            }/>
          <Route
            exact
            path="/login"
            render={() => !isAuthenticated
              ? <Login toggleAuth={toggleAuth} />
              : <Redirect to="/alerts" />
            } />
          <Route
            exact
            path="/Alerts"
            render={() => isAuthenticated
              ? <Alerts toggleAuth={toggleAuth} />
              : <Redirect to="/login" />
            } />
        </Switch>
      </Router>
    </>
  );
};

export default App;
