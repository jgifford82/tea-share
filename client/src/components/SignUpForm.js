import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ setShowSignUpForm }) => {
  const initialValues = {
    username: "",
    password: "",
    password_confirmation: "",
  };

  // State sets default form input value as object with empty strings.
  const [values, setValues] = useState(initialValues);
  // State set default error value as empty array
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);

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

    setErrors([]);
    setIsLoading(true);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        setShowSignUpForm(false);
        // r.json().then((user) => console.log(user));
        // this sends the user info to state through context instead of a callback function
        r.json().then((user) => {
          setUser(user);
          navigate("/teas");
        });
      } else {
        // console log shows errors as an array:
        // r.json().then((err) => console.log(err));
        // sets errors state with error messages if response is not ok
        r.json().then((err) => setErrors(err.errors));
      }
    });

    // clear input fields on submit by updating values state:
    setValues(initialValues);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username (minimum 2 characters){" "}
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
          Password (must be 2-8 characters){" "}
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
          ></input>
        </label>
        <br></br>
        <label>
          Confirm Password{" "}
          <input
            type="password"
            name="password_confirmation"
            autoComplete="off"
            placeholder="must match password"
            value={values.password_confirmation}
            onChange={handleInputChange}
          ></input>
        </label>
        <input type="submit" value={isLoading ? "Loading..." : "Submit"} />
      </form>
      {/* if there are errors, display them in red */}
      {errors.map((err) => (
        <li style={{ color: "red" }} key={err}>
          {err}
        </li>
      ))}
    </div>
  );
};

export default SignUpForm;
