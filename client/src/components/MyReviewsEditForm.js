import { useContext, useState } from "react";
import { TeasContext } from "../context/teas";

const MyReviewsEditForm = ({ review, onEditClick }) => {
  // use TeasContext to update teas & user state
  const { editReview } = useContext(TeasContext);

  const [errors, setErrors] = useState([]);

  const reviewId = review.id;
  //   console.log(reviewId);
  const teaId = review.tea_id;
  //   console.log(teaId);

  // captures original review comment & rating
  const initialValues = {
    comment: review.comment,
    rating: review.rating,
  };
  //   console.log(initialValues);

  // controlled edit form for review comment
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

  // State sets default form input values as object with existing values. That way, if any inputs aren't updated, they don't get changed to empty strings on submit.
  const [values, setValues] = useState(initialValues);
  //   console.log(values);

  function handleSubmit(e) {
    // prevent page refresh on submit:
    e.preventDefault();
    // console.log("submitted");
    // console.log(values);
    // console.log(reviewId);
    // console.log(teaId);

    fetch(`/teas/${teaId}/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((r) => {
        if (r.ok) {
          setErrors([]);
          return r.json();
        } else {
          r.json().then((err) => setErrors(err.error));
        }
      })
      .then((editedReview) => {
        editReview(editedReview);
        onEditClick();
      });
  }

  return (
    <div>
      {/* if there's an error, display it in red */}
      {errors ? <h3 style={{ color: "red" }}>{errors}</h3> : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="comment"
          placeholder={review.comment}
          value={values.comment}
          onChange={handleInputChange}
        />
        <br></br>
        <br></br>
        <label>
          {" "}
          Select rating: 1 (worst) to 5 (best){" "}
          <select
            name="rating"
            placeholder={review.rating}
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
        <input type="submit" value="Submit Changes" />
      </form>
    </div>
  );
};

export default MyReviewsEditForm;
