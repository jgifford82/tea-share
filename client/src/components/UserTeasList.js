import { useContext } from "react";
import { UsersContext } from "../context/users";
import { useParams } from "react-router-dom";

const UserTeasList = () => {
  const { users } = useContext(UsersContext);
  // console.log(users);

  // useParams pulls the user ID from the URL & returns object with key/value pairs.
  const params = useParams();
  // console.log(params);
  // console.log(params.id);
  // params.id data type is string
  // console.log(typeof params.id);

  // conditional rendering to check whether the users array exists before rendering it so the page doesn't crash if manually refreshed
  if (!users) {
    return <div>Loading users...</div>;
  }

  // find all teas with user id that equals the params id, which had to be converted from string to number using parseInt.
  const foundUser = users.find(({ id }) => id === parseInt(params.id));
  // console.log(foundUser);

  // create a list of all teas that the user has reviewed
  // The question mark in foundUser?.teas.map is the optional chaining operator. It allows safe access to nested properties or methods of an object without causing an error if the object is null or undefined, which prevents errors the first time navigating to the page if users hasn't loaded yet.
  // map over foundUser.teas and return elements containing tea id, name, blend, and category
  const renderReviewedTeas = foundUser?.teas.map((tea) => (
    <ul key={tea.id}>
      <h2 style={{ textDecoration: "underline" }}>{tea.name}</h2>
      <strong>Blend:</strong> <br></br>
      {tea.blend}
      <br></br>
      <br></br>
      <strong>Category:</strong> <br></br>
      {tea.category.name}
      <br></br>
      <br></br>
      <strong>Caffeine Level:</strong>
      <br></br>
      {tea.caffeine_level}
    </ul>
  ));

  // Save the username to a variable (if it's found in the foundUser variable above) so it can be displayed, otherwise it's set to an empty string
  // This allows the page to load if it's refreshed, otherwise it will error out since users state might not be loaded yet
  const username = foundUser ? foundUser.username : "";

  return (
    <div>
      {" "}
      {username}'s reviewed teas:
      {renderReviewedTeas}
    </div>
  );
};

export default UserTeasList;
