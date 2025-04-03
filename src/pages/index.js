import Head from "next/head";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaCloudSun, FaBitcoin, FaNewspaper, FaHeart } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import Weather from "@/components/WetherWidget";
import Crypto from "@/components/CryptoWidget";
import News from "@/components/NewsWidget";
import WebSocketAlerts from "@/components/NotificationWidget";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (item) => {
    let updatedFavorites = favorites.includes(item)
      ? favorites.filter((fav) => fav !== item)
      : [...favorites, item];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
          <div className="p-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Dashboard</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <FaTimes className="text-xl" />
            </button>
          </div>
          <nav className="mt-6 space-y-4 px-5">
            {["Weather", "Crypto", "News"].map((item) => (
              <div key={item} className="flex items-center justify-between text-lg hover:text-blue-500 cursor-pointer">
                <span>{item}</span>
                <FaHeart 
                  className={`cursor-pointer ${favorites.includes(item) ? "text-red-500" : "text-gray-400"}`} 
                  onClick={() => toggleFavorite(item)}
                />
              </div>
            ))}
          </nav>
        </div>

        <div className="absolute top-2 right-5 z-50">
          <WebSocketAlerts />
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col p-6 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          <header className="flex justify-between items-center mb-6">
            <button onClick={() => setSidebarOpen(true)}>
              <FaBars className="text-2xl" />
            </button>
            <h1 className="text-3xl font-bold text-blue-500 dark:text-blue-400">🌍 Dashboard</h1>
            <div></div>
          </header>

          {/* Grid Layout */}
          <div className="space-y-4">
            <Weather autoRefresh={true} />
            <Crypto autoRefresh={true} />
            <News autoRefresh={true} />
          </div>
        </div>
      </div>
    </>
  );
}
