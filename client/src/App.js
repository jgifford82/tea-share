import { useContext, useEffect } from "react";
import { UserContext } from "./context/user";
import { UsersContext } from "./context/users";
// import { TeasContext } from "./context/teas";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import TeasList from "./components/TeasList";
import TeaReviewsList from "./components/TeaReviewsList";
import UserTeasList from "./components/UserTeasList";
import MyReviewsList from "./components/MyReviewsList";

function App() {
  const { user, setUser } = useContext(UserContext);
  const { setUsers } = useContext(UsersContext);

  // Commented out teas context & fetch after implementing infinite scroll

  // const { teas, setTeas } = useContext(TeasContext);

  // Fetches teas data (containing reviews & category for each teas) from backend server & sets state with that data. No longer needed after implementing infinite scroll in TeasList component.
  // useEffect(() => {
  //   fetch("/teas")
  //     .then((r) => r.json())
  //     // .then((data) => console.log(data));
  //     // .then((data) => setTeas(data));
  //     .then((data) => {
  //       setTeas(data);
  //       setLoading(false);
  //     });
  // }, [setTeas]);

  // console.log(teas);

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
          <Route path="/teas" element={<TeasList />} />
          <Route path="/teas/:id" element={<TeaReviewsList />} />
          <Route path="/users/:id" element={<UserTeasList />} />
          {/* if user is truthy, && operator returns the route so a user that's logged in can see their reviews list */}
          {user && <Route path="/my-reviews" element={<MyReviewsList />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
