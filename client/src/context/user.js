import React, { useState } from "react";
// useContext hook lets us access the value of our context provider in any child component.

// create the context
const UserContext = React.createContext();

// create a provider component
function UserProvider({ children }) {
  // Rather than having the user variable as state in App component, we can set up the context value to be stateful.
  const [user, setUser] = useState(null);

  return (
    // the value prop of the provider will be our context data. this value will be available to child components of this provider
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };