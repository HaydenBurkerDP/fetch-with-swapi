import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom/cjs/react-router-dom";
import "./app.scss";

import Home from "./components/Home";
import People from "./components/People";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="navbar-container">
          <NavLink className="navlink" to="/people">
            Fetch with SWAPI
          </NavLink>
        </div>
        <Switch>
          <Route path="/people" component={People}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
