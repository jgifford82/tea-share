import React, { useState, useContext } from "react";
// useContext hook lets us access the value of our context provider in any child component.
import { UserContext } from "./user";

// create the context
const TeasContext = React.createContext();

// create a provider component
function TeasProvider({ children }) {
  // Rather than having the teas variable as state in App component, we can set up the context value to be stateful.
  const [teas, setTeas] = useState([]);

  // import UserContext and access user state and setUser function
  const { user, setUser } = useContext(UserContext);

  // Updates state responsible for rendering teas when new tea is added, which displays new tea at the top of the list.
  function addTea(newTea) {
    // console.log("In TeasList:", newTea);
    setTeas((prevTeas) => [newTea, ...prevTeas]);
  }

  // Updates state responsible for rendering teas when new review is added, which displays new review.
  function addReview(newReview) {
    // console.log("In TeaReviewsList:", newReview);
    // map over teas. if the tea id matches the new review's foreign key for tea id, it will copy the tea and nested reviews, and add in the new review. Otherwise, it will return the existing tea.
    const updateTeas = teas.map((tea) => {
      if (tea.id === newReview.tea_id) {
        return {
          ...tea,
          reviews: [newReview, ...tea.reviews],
        };
      }
      return tea;
    });

    // update logged in user state with new review. if user navigates to My Reviews page after posting a new review, the new review will be displayed without having to refresh the page.
    const updateUser = { ...user, reviews: [...user.reviews, newReview] };

    // console.log(updateTeas);
    setTeas(updateTeas);

    // console.log(updateUser);
    setUser(updateUser);
  }

  function deleteReview(deletedReview) {
    // console.log("handle delete Review", deletedReview);

    // update logged in user state without the deleted review so it's no longer displayed on My Reviews page.
    // set state by creating a new array in which the deleted item has been filtered out
    const updateUser = {
      ...user,
      reviews: user.reviews.filter((review) => review.id !== deletedReview.id),
    };

    // map over teas. if the tea id matches the deleted review's foreign key for tea id, it will copy the tea and filter down the tea's reviews to those whose id don't match the deleted review's id.
    const updateTeas = teas.map((tea) => {
      if (tea.id === deletedReview.tea_id) {
        return {
          ...tea,
          reviews: tea.reviews.filter(
            (review) => review.id !== deletedReview.id
          ),
        };
      }
      return tea;
    });

    // console.log(updateUser);
    setUser(updateUser);

    // console.log(updateTeas);
    setTeas(updateTeas);
  }

  function editReview(editReview) {
    // console.log("In ReviewsList:", editReview);

    // map over all teas. if the tea id matches edited review's foreign key for tea id, it'll replace existing review as long as the review id matches the id of the review being edited.
    const updateTeas = teas.map((tea) => {
      if (tea.id === editReview.tea_id) {
        return {
          ...tea,
          reviews: tea.reviews.map((review) => {
            if (review.id === editReview.id) {
              return editReview;
            }
            return review;
          }),
        };
      }
      return tea;
    });

    // update logged in user state with the edited review
    // create a new updateUser object that copies the user state and replaces the old review object with the updated review object in the reviews array using the map function.
    const updateUser = {
      ...user,
      reviews: user.reviews.map((review) => {
        if (review.id === editReview.id) {
          return editReview;
        }
        return review;
      }),
    };

    setUser(updateUser);
    // console.log(updateUser);

    setTeas(updateTeas);
    // console.log(updateTeas);
  }

  return (
    // the value prop of the provider will be our context data. this value will be available to child components of this provider
    <TeasContext.Provider
      value={{ teas, setTeas, addTea, addReview, deleteReview, editReview }}
    >
      {children}
    </TeasContext.Provider>
  );
}

export { TeasContext, TeasProvider };
