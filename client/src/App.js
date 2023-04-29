import { useContext, useEffect } from "react";
import { UserContext } from "./context/user";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
  const { setUser } = useContext(UserContext);

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
