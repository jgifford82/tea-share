import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { TeasContext } from "../context/teas";

const TeaReviewsForm = () => {
  // use TeasContext to update teas state
  const { addReview } = useContext(TeasContext);

  // Set the default caffeine_level & category_id values to "1" so the user doesnt have to select the default values for successful form submission (otherwise it returns errors for blank values).
  const initialValues = {
    comment: "",
    rating: "1",
  };

  // State sets default form input value as object with empty strings.
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  // useParams returns object with key/value pairs. destructured the id value to use it in teaId variable
  const { id } = useParams();
  //   console.log({ id });

  // id is converted from object with key/value pair to an integer so it can be used in the fetch POST below
  const teaId = parseInt(id);
  //   console.log(teaId);

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

    fetch(`/teas/${teaId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   stringify the review hash containing comment/postContent key/value pair
      body: JSON.stringify(values),
    }).then((r) => {
      if (r.ok) {
        setErrors([]);
        // r.json().then((data) => console.log(data));
        // addTea callback function defined in TeasContext
        r.json().then((newReview) => addReview(newReview));
      } else {
        // console log shows errors as an array:
        // r.json().then((err) => console.log(err));
        // sets errors state with error messages if response is not ok
        r.json().then((err) => {
          if (err.errors) {
            setErrors(err.errors);
          } else {
            setErrors([err.error]);
          }
        });
      }
    });

    // clear input fields on submit by updating postContent state:
    setValues(initialValues);
  }

  // console.log(teas);

  return (
    <div>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>
          Add a review:
          <textarea
            type="text"
            name="comment"
            value={values.comment}
            onChange={handleInputChange}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          {" "}
          Select rating: 1 (worst) to 5 (best){" "}
          <select
            name="rating"
            value={values.rating}
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
        <input type="submit" value="Submit"></input>
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

export default TeaReviewsForm;
