import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { TeasContext } from "../context/teas";
import InfiniteScroll from "react-infinite-scroll-component";
import TeasForm from "./TeasForm";

const TeasList = () => {
  // page keeps track of the current page or offset for fetching teas
  const [page, setPage] = useState(1);
  // hasMore keeps track of whether there is more data available for infinite scroll
  const [hasMore, setHasMore] = useState(true);

  const { teas, setTeas } = useContext(TeasContext);

  // fetch teas data from the API when TeasList component mounts
  useEffect(() => {
    fetch("/teas?page=1")
      .then((r) => r.json())
      // .then((data) => console.log(data));
      .then((data) => setTeas(data));
  }, [setTeas]);

  // fetches more teas data when user triggers the infinite scroll by reaching end of page. updates teas state with newly fetched data, increments the page state for the next fetch, and sets hasMore to false if there are no more teas to fetch.
  const fetchMoreTeas = async () => {
    const response = await fetch(`/teas?page=${page + 1}`);
    const data = await response.json();
    console.log("Teas API response:", data);
    if (data.length > 0) {
      setTeas((prevTeas) => [...prevTeas, ...data]);
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false); // No more data available
    }
  };

  console.log(teas);

  return (
    <div>
      <h1>Tea</h1>
      <TeasForm />
      <InfiniteScroll
        dataLength={teas.length || 0} // Length of the data array. if falsy (0, null, or undefined), OR operator evaluates to 0, ensuring a valid value
        next={fetchMoreTeas} // This prop specifies the function that should be called when the user reaches the end of the scrollable content.
        hasMore={hasMore} // Boolean indicating if there is more data to load; fetchMoreTeas sets it false when no more data
        loader={<h4>Loading...</h4>} // displays while loading more data
      >
        {teas.map((tea) => (
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
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default TeasList;
