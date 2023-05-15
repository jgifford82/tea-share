import MyReviewsCard from "./MyReviewsCard";
import { useState, useContext } from "react";
import { TeasContext } from "../context/teas";

const MyReviewsList = () => {
  // use TeasContext to update teas & user state
  const { deleteReview } = useContext(TeasContext);

  const [errors, setErrors] = useState([]);

  function handleDeleteClick(e, review) {
    // tea & review id's taken from the review object argument passed into the function
    const teaId = review.tea_id;
    const reviewId = review.id;

    fetch(`/teas/${teaId}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        setErrors([]);
        // r.json().then((data) => console.log(data));
        r.json().then((deletedReview) => deleteReview(deletedReview));
      } else {
        r.json().then((err) => console.log(err));
        // r.json().then((err) => setErrors(err.error));
      }
    });
  }

  return (
    <div>
      {/* if there's an error, display it in red */}
      {errors ? <h3 style={{ color: "red" }}>{errors}</h3> : null}
      <MyReviewsCard onDeleteClick={handleDeleteClick} />
    </div>
  );
};

export default MyReviewsList;
