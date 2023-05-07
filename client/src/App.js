import { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/user";
import { UsersContext } from "./context/users";
import { TeasContext } from "./context/teas";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import TeasList from "./components/TeasList";
import TeaReviewsList from "./components/TeaReviewsList";
import UserTeasList from "./components/UserTeasList";

function App() {
  const { user, setUser } = useContext(UserContext);
  const { setUsers } = useContext(UsersContext);
  const { teas, setTeas } = useContext(TeasContext);
  const [loading, setLoading] = useState(true);

  // Fetches teas data (containing reviews & category for each teas) from backend server & sets state with that data.
  useEffect(() => {
    fetch("/teas")
      .then((r) => r.json())
      // .then((data) => console.log(data));
      // .then((data) => setTeas(data));
      .then((data) => {
        setTeas(data);
        setLoading(false);
      });
  }, [setTeas]);

  console.log(teas);

  // Fetches users data (containing teas) from backend server & sets state with that data.
  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      // .then((data) => console.log(data));
      .then((data) => setUsers(data));
  }, [setUsers]);

  // console.log(users);

  // don't need setUser in dependency array, but added it in to clear warning on browser console. removing dependency array led to continuous fetches.
  useEffect(() => {
    // auto-login
    fetch("/auth").then((r) => {
      if (r.ok) {
        // r.json().then((user) => console.log(user));
        r.json().then((user) => setUser(user));
      }
    });
  }, [setUser]);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* !loading && checks if loading is false before rendering the TeasList component so it renders when teas data finishes loading */}
          {/* if user is truthy, && operator returns the route so a user that's logged in can see the teas */}
          {!loading && user && (
            <Route path="/teas" element={<TeasList teas={teas} />} />
          )}
          <Route path="/teas/:id" element={<TeaReviewsList />} />
          <Route path="/users/:id" element={<UserTeasList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
