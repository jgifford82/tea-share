import { useContext, useState } from "react";
import { UserContext } from "../context/user";

const MyReviewsCard = () => {
  // user variable from UserContext allows access to the list of logged in user's teas & reviews
  const { user } = useContext(UserContext);
  console.log(user);

  // conditional rendering to check whether the user array exists before rendering it so the page doesn't crash if manually refreshed
  if (!user) {
    return <div>Loading...</div>;
  }

  // Map through user's reviews to render each review comment & tea name. Display a delete button & edit button next to each review.
  const renderUserReviewedTeas = user.reviews.map((review) => {
    return (
      <div key={review.id}>
        <h3>{review.tea.name}</h3>
        {/* <button onClick={(e) => onDeleteClick(e, review)}>X</button>{" "}
        <button onClick={(e) => handleEditClick(e, review)}>Edit</button>{" "} */}
        <span>{review.comment}</span>
      </div>
    );
  });

  return (
    <div>
      My Reviews:
      <>{renderUserReviewedTeas}</>
    </div>
  );
};

export default MyReviewsCard;
