import React, { useState } from "react";
// useContext hook lets us access the value of our context provider in any child component.

// create the context
const UsersContext = React.createContext();

// create a provider component
function UsersProvider({ children }) {
  // Rather than having the user variable as state in App component, we can set up the context value to be stateful.
  const [users, setUsers] = useState(null);

  return (
    // the value prop of the provider will be our context data. this value will be available to child components of this provider
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
