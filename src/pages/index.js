import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Weather from "@/components/WetherWidget";
import Crypto from "@/components/CryptoWidget";
import News from "@/components/NewsWidget";
import { useState } from "react";
import { FaSun, FaMoon, FaBars, FaTimes, FaCloudSun, FaBitcoin, FaNewspaper } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import WebSocketAlerts from "@/components/NotificationWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>
  <Toaster position="top-right" reverseOrder={false} />

<div className={`${darkMode ? "dark" : ""}`}>
  <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
    
    {/* Sidebar */}
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Dashboard
        </h2>
        <button onClick={() => setSidebarOpen(false)}>
          <FaTimes className="text-xl" />
        </button>
      </div>
      <nav className="mt-6 space-y-4 px-5">
        <a href="#" className="flex items-center space-x-3 text-lg hover:text-blue-500">
          <FaCloudSun /> <span>Weather</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-lg hover:text-blue-500">
          <FaBitcoin /> <span>Crypto</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-lg hover:text-blue-500">
          <FaNewspaper /> <span>News</span>
        </a>
      </nav>
    </div>
    <div className="absolute top-2 right-1 md:top-2 md:right-5 z-50">
    <WebSocketAlerts />
  </div>
    {/* Main Content */}
    <div
      className={`flex-1 flex flex-col p-6 transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-0"
      }`}
    >
      {/* Navbar */}
      <header className="flex justify-between items-center mb-6">
        <button onClick={() => setSidebarOpen(true)}>
          <FaBars className="text-2xl" />
        </button>
        <h1 className="text-3xl font-bold text-blue-500 dark:text-blue-400">🌍 Dashboard</h1>
        <div></div>
       
      </header>

      {/* Grid Layout */}
      <div className="overflow-x-auto whitespace-nowrap space-x-4 flex pb-4">
        <Weather />
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition transform overflow-x-hidden md:my-2">
        <Crypto />
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition transform md:my-2">
        <News />
      </div>
    </div>
  </div>

  {/* 🔥 Notification Widget - Always on Top Right */}

</div>
    </>
  );
}
