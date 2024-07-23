import { useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import FeedbackBar from "./components/FeedbackBar/FeedbackBar";
import LocationBar from "./components/LocationBar/LocationBar";
import LocationCard from "./components/LocationCard/LocationCard";
import Weather from "./components/Weather/Weather";
import "./App.css";

function App() {
  const [card, setCard] = useState([]);
  const [cardDetails, setCardDetails] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getData = (userInput) => {
    if (typeof userInput === "object" && card.length < 5) {
      const alreadyExists = card.some((c) => c.name === userInput.name);
      !alreadyExists &&
        setCard((c) => {
          console.log(c[0]?.name, userInput.name);
          return [...c, userInput];
        });

      setErrorMsg((e) => "");
    }
    if (typeof userInput === "object" && card.length === 5) {
      setErrorMsg((e) => "maxReached");
    }
    if (userInput === "error") {
      setErrorMsg((e) => "wrongKeyword");
    }
  };
  const timeOut = (t) => {
    // console.log(t);
    t === "clear" && setErrorMsg((e) => "");
  };
  const deleteFromState = (m) => setCard((c) => c.filter((i) => i.id !== m));

  const detailsUpdate = (m) => {
    setCardDetails((c) => card.find(({ id }) => id === m));
  };
  return (
    <>
      <Header />
      <SearchBar onSubmit={getData} />
      {errorMsg && <FeedbackBar onTimeOut={timeOut} msg={errorMsg} />}
      <LocationBar>
        {card.length === 0 && (
          <>
            <h2 className="col-span-full text-2xl m-4">No locations added yet</h2>
          </>
        )}
        {card.map((obj) => (
          <LocationCard
            key={obj.id}
            detailsUpdate={detailsUpdate}
            deleteBtn={deleteFromState}
            data={obj}
          />
        ))}
      </LocationBar>
      <Weather details={cardDetails}></Weather>
    </>
  );
}

export default App;
