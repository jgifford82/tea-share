import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  // State sets default form input value as object with empty strings.
  const [values, setValues] = useState(initialValues);
  // State set default error value as empty array
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // removed user variable to clear warning in browser console
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handles all form inputs with a single onChange handler. Destructured name & value attributes from input fields to reference the key/value pairs when updating state. onChange prop added to each input to call handleInputChange
  const handleInputChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    // console.log(values);
  };

  function handleSubmit(e) {
    // prevent page refresh on submit:
    e.preventDefault();
    // console.log("submitted");
    // console.log(values);

    setIsLoading(true);

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        setErrors([]);
        // r.json().then((user) => console.log(user));
        // this sends the user info to state through context instead of callback function
        r.json().then((user) => {
          setUser(user);
          navigate("/teas");
        });
      } else {
        // console log shows object with error messages:
        // r.json().then((err) => console.log(err));
        r.json().then((err) => setErrors(err.error));
      }
    });

    // clear input fields on submit by updating values state:
    setValues(initialValues);
  }

  // shows current user for auto-login
  //   console.log(user);

  // console.log(errors);

  return (
    <div>
      <h1>Log in to view & post tea reviews!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleInputChange}
          ></input>
        </label>
        <br></br>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="on"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
          ></input>
        </label>
        <input type="submit" value={isLoading ? "Loading..." : "Log In"} />
      </form>
      {/* if there's an error, display it in red */}
      {errors ? <h3 style={{ color: "red" }}>{errors}</h3> : null}
    </div>
  );
};

export default LogInForm;
