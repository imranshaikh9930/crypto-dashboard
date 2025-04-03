import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegBell } from "react-icons/fa";


const WebSocketAlerts = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // WebSocket Connection for Crypto Prices
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
   

      Object.keys(data).forEach((crypto) => {
        const price = parseFloat(data[crypto]).toFixed(2);

        setNotifications((prev) => [
          { type: "price_alert", message: `${crypto.toUpperCase()} price updated: $${price}` },
          ...prev.slice(0, 1), // Max 5 notifications
        ]);

        toast.success(`${crypto.toUpperCase()} price updated: $${price}`);
      });
    };

    // Simulated Weather Alerts
    const weatherSocket = new WebSocket("wss://example-weather-alerts.com");
    
    weatherSocket.onopen = () => {
        console.log("✅ WebSocket Connected!");
      };
      
      weatherSocket.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
      };
      
      weatherSocket.onclose = () => {
        console.log("🔴 WebSocket Disconnected");
      };
    // weatherSocket.onmessage = (event) => {
    //   const weatherData = JSON.parse(event.data);
    //   console.log("Weather Alert:", weatherData);

    //   setNotifications((prev) => [
    //     { type: "weather_alert", message: weatherData.alert },
    //     ...prev.slice(0, 4),
    //   ]);

    //   toast.error(`Weather Alert: ${weatherData.alert}`);
    // };

    return () => {
      socket.close();
      weatherSocket.close();
    };
  }, []);

  return (
    <div className="relative">
      {/* Notification Toggle Button */}
      <div className="absolute top-5 right-5 z-50">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg"
        >
          {showNotifications ? "X" :<FaRegBell/>}
        </button>
      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute top-16 right-5 w-64 bg-white dark:bg-blue-800 shadow-lg rounded-lg p-4 z-50">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Notifications
          </h2>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="text-gray-500 dark:text-gray-400">No notifications yet.</li>
            ) : (
              notifications.map((alert, index) => (
                <li
                  key={index}
                  className={`p-2 border-b border-gray-300 dark:border-gray-700 rounded-md ${
                    alert.type === "price_alert"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {alert.message}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WebSocketAlerts;
