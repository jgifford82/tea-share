import { useState, useContext } from "react";
import { TeasContext } from "../context/teas";

const TeasForm = () => {
  // use TeasContext to update teas state
  const { addTea } = useContext(TeasContext);

  // Set the default caffeine_level & category_id values to "1" so the user doesnt have to select the default values for successful form submission (otherwise it returns errors for blank values).
  const initialValues = {
    name: "",
    blend: "",
    caffeine_level: "1",
    category_id: "1",
  };

  // State sets default form input value as object with empty strings.
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  // Handles all form inputs with a single onChange handler. Destructured name & value attributes from input fields to reference the key/value pairs when updating state. onChange prop added to each input to call handleInputChange
  const handleInputChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;

    // check if the value is empty (i.e., the user didn't make a selection)
    if (!value) {
      setValues({
        ...values,
        [name]: initialValues[name], // set the value to the default value
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
    // console.log(values);
  };

  function handleSubmit(e) {
    // prevent page refresh on submit:
    e.preventDefault();
    // console.log("submitted");
    // console.log(values);

    fetch("/teas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => {
      if (r.ok) {
        setErrors([]);
        // addTea callback function defined in TeasContext
        r.json().then((newTea) => addTea(newTea));
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
    <div style={{ border: "3px solid black", padding: "1px" }}>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Add new tea:</strong>
          <br></br>
        </label>
        <br></br>
        <label>Tea Name:</label>
        <br></br>
        <input
          type="text"
          name="name"
          placeholder="Example: Soothing Lavender Green Tea"
          value={values.name}
          onChange={handleInputChange}
          style={{ width: "50%", textAlign: "center" }}
        ></input>
        <br></br>
        <br></br>
        <label>Tea Blend:</label>
        <br></br>
        <textarea
          type="text"
          name="blend"
          placeholder={`Example: \nLavender, Chamomile, Green Tea. \nSteep 1 teaspoon in 8 oz boiling water for 3-5 minutes`}
          value={values.blend}
          onChange={handleInputChange}
          rows="5"
          style={{ width: "50%", textAlign: "center" }}
        />
        <br></br>
        <br></br>
        <label>
          {" "}
          Select caffeine level: 1 (low) to 5 (high){" "}
          <select
            name="caffeine_level"
            value={values.caffeine_level}
            onChange={handleInputChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br></br>
        </label>
        <br></br>
        <label>
          Select category{" "}
          <select
            name="category_id"
            value={values.category_id}
            onChange={handleInputChange}
          >
            {" "}
            <option value="1">Black</option>
            <option value="2">Green</option>
            <option value="3">Herbal</option>
            <option value="4">Oolong</option>
            <option value="5">White</option>
          </select>
          <br></br>
        </label>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>
      <br></br>
      {/* if there are errors, display them in red */}
      {errors.map((err) => (
        <li style={{ color: "red" }} key={err}>
          {err}
        </li>
      ))}
    </div>
  );
};

export default TeasForm;
