import React, { useState } from "react";
// useContext hook lets us access the value of our context provider in any child component.

// create the context
const TeasContext = React.createContext();

// create a provider component
function TeasProvider({ children }) {
  // Rather than having the teas variable as state in App component, we can set up the context value to be stateful.
  const [teas, setTeas] = useState(null);

  // Updates state responsible for rendering teas when new tea is added, which displays new tea at the top of the list.
  function addTea(newTea) {
    console.log("In TeasList:", newTea);
    setTeas((prevTeas) => [newTea, ...prevTeas]);
  }

  return (
    // the value prop of the provider will be our context data. this value will be available to child components of this provider
    <TeasContext.Provider value={{ teas, setTeas, addTea }}>
      {children}
    </TeasContext.Provider>
  );
}

export { TeasContext, TeasProvider };
