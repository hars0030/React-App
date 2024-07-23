import { useEffect, useState } from "react";
const API_KEY = "ad1f361fc92e5e7cb94039b0e32c18ba";

export default function SearchBar({ onSubmit }) {
  const [userInput, setUserInput] = useState("");
  const [submitValue, setSubmitValue] = useState("");

  const handleUserInput = (ev) => {
    const input = ev.target.value;
    setUserInput((u) => input);
  };
  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    setSubmitValue((v) => userInput);
  };

  useEffect(() => {
    if (!submitValue) return;
    (async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${submitValue}&appid=${API_KEY}`
        );
        const fetchData = await res.json();
        if (!res.ok || fetchData.length === 0) {
          throw new Error("wrong keyword entered");
        }
        const [info] = fetchData;
        const location = {
          id: crypto.randomUUID(),
          lat: info.lat,
          lng: info.lon,
          country: info.country,
          name: info.name,
        };

        fetchData.length > 0 && onSubmit(location);
      } catch (error) {
        onSubmit("error");
      }
    })();
  }, [submitValue]);
  return (
    <>
      <div className="wrap bg-green-950 p-7">
        <form onSubmit={handleFormSubmit}>
          <div className="formWrapper flex justify-center items-center gap-4">
            <label htmlFor="userInput" className="text-xl md:text-3xl sm:text-2xl">
              City, Province, Country
            </label>
            <input
              className="p-4 rounded-lg bg-green outline-4 outline-white border-white border-solid "
              id="userInput"
              type="text"
              value={userInput}
              onChange={handleUserInput}
            />
            <button className="bg-green-600 text-xl md:text-3xl sm:text-2xl" type="submit">Find Location</button>
          </div>
        </form>
      </div>
    </>
  );
}
