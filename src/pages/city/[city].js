import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";

export default function CityDetails() {
  const router = useRouter();
  const { city } = router.query;

  const { loading, error } = useSelector((state) => state.weather);
  const [history, setHistory] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeatherHistory = async () => {
      try {
        const res = await fetch(`/api/weatherHistory?city=${city}`);
        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Failed to fetch weather history");

        setHistory(result); // Directly set array
      } catch (err) {
        console.error("Error fetching weather history:", err.message);
        setFetchError(err.message);
      }
    };

    fetchWeatherHistory();
  }, [city]);

  if (loading) return <div><Loader/></div>;
  if (error || fetchError) return <div className="text-red-500">Error: {error || fetchError}</div>;
  if (!history.length) return <div><Loader/></div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{city} Weather Details</h1>

      {/* Weather History Chart */}
      <h2 className="text-xl font-semibold mt-5">Temperature Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Weather History Table */}
      <h2 className="text-xl font-semibold mt-5">Weather History</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 mt-3">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Temperature (°C)</th>
              <th className="border border-gray-300 px-4 py-2">Humidity (%)</th>
              <th className="border border-gray-300 px-4 py-2">Condition</th>
            </tr>
          </thead>
          <tbody>
            {history.map((day, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{day.date}</td>
                <td className="border border-gray-300 px-4 py-2">{day.temp}°C</td>
                <td className="border border-gray-300 px-4 py-2">{day.humidity}%</td>
                <td className="border border-gray-300 px-4 py-2">{day.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/" className="mt-5 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Back to Dashboard
      </Link>
    </div>
  );
}
