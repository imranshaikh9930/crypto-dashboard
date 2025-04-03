import React ,{useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchWeather } from "@/store/weatherSlice";
import Link from "next/link";
import Loader from "./Loader";


const Weather = ()=>{
    const dispatch = useDispatch();
    const {data,loading,error} = useSelector((state)=> state.weather);

    useEffect(() => {
        const cities = ["New York", "London", "Tokyo"];
    
        // Fetch weather only if it's not already in the Redux store
        cities.forEach((city) => {
          if (!data.some((weather) => weather.name === city)) {
            dispatch(fetchWeather(city));
          }
        });
      }, [dispatch,data])

    if(loading) return <div><Loader/></div>

    if(error) return <div>Error : {error}</div>

   
    return (
      
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 w-full">
        <h2 className="text-2xl font-bold mb-3">☁️ Weather</h2>
        <div className="mt-3 md:mt-0 flex flex-col gap-3 md:flex-row md:gap-0 md:justify-around overflow-x-auto space-x-4 pb-4">
          {data?.map((cityWeather, index) => (
            <Link
              key={index}
              className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-md p-5 rounded-xl min-w-[270px] flex-shrink-0 hover:shadow-lg transition-transform duration-300 ease-in-out gap-3 "
                href={`/city/${cityWeather.name }`}
            >
              {/* City Name & Icon */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold flex items-center gap-2">
                  {(cityWeather.name === "New York" && "🌇") ||
                    (cityWeather.name === "London" && "🏙️") ||
                    (cityWeather.name === "Tokyo" && "🗼")}
                  {cityWeather.name}
                </span>
              </div>

              {/* Temperature & Weather */}
              <div className="flex justify-between items-center mt-4 md:gap-3">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {cityWeather.main.temp}°C
                </span>
                <span className="capitalize bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full text-gray-900 dark:text-white text-sm font-medium">
                  {cityWeather.weather[0].description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
  
    )
}

export default Weather;