import { useEffect, useState } from "react";
import { getCardinalDirection, dateBuilder, API_key } from "../utils/utils";

export function Weather() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");

  const temp = Math.round(weather.main?.temp - 273.15) + "°C";

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [userLocationWeather, setUserLocationWeather] = useState({});

  useEffect(() => {
    const fetchUserWeather = async () => {
      try {
        await window.navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`
        )
          .then((res) => res.json())
          .then((res) => {
            setUserLocationWeather(res);
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserWeather();
  }, [latitude, longitude]);

  console.log(userLocationWeather);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
    )
      .then((res) => res.json())
      .then((res) => {
        setWeather(res);
        setCity("");
      });
  }

  return (
    <>
      <div
        className={userLocationWeather.main?.temp < 288 ? " app " : "app warm"}
      >
        {typeof userLocationWeather.main == "undefined" ? (
          <ul className="weather-box">
            <li>Loading your current location weather info</li>
          </ul>
        ) : (
          <>
            <div className="location-box">
              <div className="location">
                {userLocationWeather.name}, {userLocationWeather.sys?.country}
              </div>
            </div>
            <ul className="weather-box">
              <li>Temp: {Math.round(userLocationWeather.main?.temp)}</li>

              <li>Humidity: {userLocationWeather.main?.humidity} %</li>

              <li className="weatherDescritpion">
                <img
                  src={`http://openweathermap.org/img/wn/${userLocationWeather.weather?.[0].icon}@2x.png`}
                  alt={userLocationWeather.weather?.[0].description}
                />
                <div>{userLocationWeather.weather?.[0].description}</div>
              </li>

              <li>
                Wind direction:{" "}
                {getCardinalDirection(userLocationWeather.wind?.deg)}, speed:{" "}
                {userLocationWeather.wind?.speed} m/s
              </li>
            </ul>
          </>
        )}
      </div>
      <div className={weather.main?.temp < 288 ? " app " : "app warm"}>
        <main>
          <form className="search-box" onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => {
                setCity(e.target.value);
              }}
              value={city}
            />
          </form>

          {typeof weather.main != "undefined" ? (
            <>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys?.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <ul className="weather-box">
                <li>Temp: {temp}</li>

                <li>Humidity: {weather.main.humidity} %</li>

                <li className="weatherDescritpion">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
                    alt={weather.weather?.[0].description}
                  />
                  <div>{weather.weather?.[0].description}</div>
                </li>

                <li>
                  Wind direction: {getCardinalDirection(weather?.wind.deg)},
                  speed: {weather?.wind.speed} m/s
                </li>
              </ul>
            </>
          ) : (
            " "
          )}
        </main>
      </div>
    </>
  );
}
