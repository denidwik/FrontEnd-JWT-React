import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import React from "react";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: localStorage.getItem("token") === undefined ? false : true,
    };
  }

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <PrivateRoute path="/dashboard" authenticated={this.state.isAuthenticated} component={Dashboard} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
