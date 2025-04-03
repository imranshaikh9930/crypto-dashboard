import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "@/store/weatherSlice";
import Link from "next/link";
import Loader from "./Loader";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Weather = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const cities = ["New York", "London", "Tokyo"];
    cities.forEach((city) => {
      if (!data.some((weather) => weather.name === city)) {
        dispatch(fetchWeather(city));
      }
    });
  }, [dispatch, data]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (city) => {
    let updatedFavorites;
    if (favorites.includes(city)) {
      updatedFavorites = favorites.filter((fav) => fav !== city);
    } else {
      updatedFavorites = [...favorites, city];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
  };

  if (loading) return <div><Loader /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 w-full">
      <h2 className="text-2xl font-bold mb-3">☁️ Weather</h2>
      
      {/* Favorite Cities Section */}
      {favorites.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-yellow-500">⭐ Favorite Cities</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {favorites.map((favCity, index) => (
              <span key={index} className="bg-yellow-100 dark:bg-yellow-600 px-3 py-1 rounded-lg font-medium">
                {favCity}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Weather Cards */}
      <div className="mt-3 md:mt-0 flex flex-col gap-3 md:flex-row md:gap-0 md:justify-around overflow-x-auto space-x-4 pb-4">
        {data?.map((cityWeather, index) => (
          <div key={index} className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-md p-5 rounded-xl min-w-[270px] flex-shrink-0 hover:shadow-lg transition-transform duration-300 ease-in-out gap-3">
            <Link href={`/city/${cityWeather.name}`}> 
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold flex items-center gap-2">
                  {(cityWeather.name === "New York" && "🌇") ||
                    (cityWeather.name === "London" && "🏙️") ||
                    (cityWeather.name === "Tokyo" && "🗼")}
                  {cityWeather.name}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4 md:gap-3">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {cityWeather.main.temp}°C
                </span>
                <span className="capitalize bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full text-gray-900 dark:text-white text-sm font-medium">
                  {cityWeather.weather[0].description}
                </span>
              </div>
            </Link>
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(cityWeather.name)}
              className="absolute top-3 right-3 text-xl text-red-500 hover:text-red-700"
            >
              {favorites.includes(cityWeather.name) ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
