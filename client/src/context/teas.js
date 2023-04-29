import React, { useState } from "react";
// useContext hook lets us access the value of our context provider in any child component.

// create the context
const TeasContext = React.createContext();

// create a provider component
function TeasProvider({ children }) {
  // Rather than having the teas variable as state in App component, we can set up the context value to be stateful.
  const [teas, setTeas] = useState(null);

  return (
    // the value prop of the provider will be our context data. this value will be available to child components of this provider
    <TeasContext.Provider value={{ teas, setTeas }}>
      {children}
    </TeasContext.Provider>
  );
}

export { TeasContext, TeasProvider };
