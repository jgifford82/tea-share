import React, { useState } from "react";
// useContext hook lets us access the value of our context provider in any child component.
// import { UserContext } from "./user";

// create the context
const TeasContext = React.createContext();

// create a provider component
function TeasProvider({ children }) {
  // Rather than having the teas variable as state in App component, we can set up the context value to be stateful.
  const [teas, setTeas] = useState(null);

  // import UserContext and access user state and setUser function
  // const { user, setUser } = useContext(UserContext);

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
    // const updateUser = { ...user, reviews: [...user.reviews, newReview] };

    // console.log(updateTeas);
    setTeas(updateTeas);

    // console.log(updateUser);
    // setUser(updateUser);
  }

  return (
    // the value prop of the provider will be our context data. this value will be available to child components of this provider
    <TeasContext.Provider value={{ teas, setTeas, addTea, addReview }}>
      {children}
    </TeasContext.Provider>
  );
}

export { TeasContext, TeasProvider };
