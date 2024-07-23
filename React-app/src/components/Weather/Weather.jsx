import { useEffect, useState } from "react";
const API_KEY = "ad1f361fc92e5e7cb94039b0e32c18ba";

export default function Weather({ details }) {
  const [weather, setWeather] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!details) return;
    const { lat, lng: lon } = details;
    setError((e) => null);
    (async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error("something is wrong");
        const data = await res.json();
        setWeather((w) => data);
        setSelectedLocation((l) => data);
        console.log(data);
      } catch (error) {
        setError((e) => error.message);
      } finally {
        setSelectedLocation((l) => false);
      }
    })();
  }, [details]);

  if (selectedLocation === null)
    return <h3 className="text-2xl">No location selected</h3>;
  if (error) return <h3 className="text-2xl">Something went Wrong</h3>;

  return (
    <>
      <h2>Weather For {details.name}</h2>
      <div className="data flex flex-col">
        <div className="img flex justify-center items-center">
          Clouds - {weather.weather[0].main}
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt=""
          />
        </div>
        <p>Temperature:{weather.main.temp} &deg;C</p>
        <p>Feels like:{weather.main.feels_like} &deg;C</p>
        <p>wind:{weather.wind.speed} m/s</p>
      </div>
    </>
  );
}
