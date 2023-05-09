import { TeasContext } from "../context/teas";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import TeaReviewsForm from "./TeaReviewsForm";

const TeaReviewsList = () => {
  // use TeasContext to access teas state
  const { teas } = useContext(TeasContext);
  //   console.log(teas);

  // useParams returns object with key/value pairs.
  const params = useParams();
  //   console.log(params.id);

  // conditional rendering to check whether the teas array exists before rendering it so the page doesn't crash if manually refreshed
  if (!teas) {
    return <div>Loading teas...</div>;
  }

  // find all reviews with tea id that equals the params id, which had to be converted from string to number using parseInt.
  const foundTea = teas.find(({ id }) => id === parseInt(params.id));
  //   console.log(foundTea);
  //   console.log(foundTea.reviews);

  // wrapping each review in a div with a margin-bottom style property adds a space in between each review displayed
  const renderReviews = foundTea.reviews.map((review) => (
    <div key={review.id} style={{ marginBottom: "1rem" }}>
      <li>
        <span style={{ fontWeight: "bold" }}>
          <Link to={`/users/${review.user.id}`}>{review.user.username}:</Link>
        </span>{" "}
        "{review.comment}"<br></br>
        <strong>Rating:</strong> {review.rating}
      </li>
    </div>
  ));

  return (
    <div>
      <TeaReviewsForm />{" "}
      <h1>
        Reviews for
        <br></br>
        {/* Conditional rendering allows the page to load if it's refreshed, otherwise it will error out since teas state might not be loaded yet*/}
        <em>{foundTea.name} tea</em>
      </h1>
      {renderReviews}
    </div>
  );
};

export default TeaReviewsList;
