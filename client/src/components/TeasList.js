import { Link } from "react-router-dom";
import { useContext } from "react";
import { TeasContext } from "../context/teas";
import TeasForm from "./TeasForm";

const TeasList = () => {
  const { teas } = useContext(TeasContext);

  // conditional rendering to check whether the teas array exists before rendering it so the page doesn't crash if manually refreshed
  if (!teas) {
    return <div>Loading teas...</div>;
  }

  const renderTeas = teas.map((tea) => (
    <ul key={tea.id}>
      <strong>
        <Link to={`/teas/${tea.id}`}>{tea.name}</Link>
      </strong>{" "}
      <br></br>
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
  return (
    <div>
      <h1>Tea</h1>
      <TeasForm />
      {renderTeas}
    </div>
  );
};

export default TeasList;
