
import Login from "./containers/login";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/user";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router";
import { getRoles } from "./redux/roles";
import { getSedes } from "./redux/sedes";
import { getBloques } from "../src/redux/bloques";
import { setUsers } from "./redux/users";
import "./App.css";
import Routes from "./Routes";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory()

  useEffect(() => {
    dispatch(setUsers())
    dispatch(getBloques());
    dispatch(getSedes());
    dispatch(getRoles());

    axios
      .get("/api/users/me")
      .then((res) => res.data)
      .then((user) => axios.get(`/api/users/${user.id}`))
      .then((res) => res.data)
      .then((user) => dispatch(setUser(user)))
      .catch(err => {
        if (!location.pathname.includes('login')) history.push('/login')
      })
  }, [dispatch, history, location.pathname]);

  return (
    <div className="App">
      {!location.pathname.includes("login") && <Sidebar />}
      {!location.pathname.includes("login") && <Navbar />}
      <Switch>
        <Route exact path="/adminlogin" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route component={Routes} />
      </Switch>
    </div>
  );
}

export default App;
