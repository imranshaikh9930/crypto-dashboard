import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load the Line chart to improve performance
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

// Register Chart.js modules
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import Loader from "@/components/Loader";
const CryptoDetails = () => {
  const router = useRouter();
  const { crypto } = router.query;
  
  const [cryptoData, setCryptoData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    if (!crypto) return;

    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${crypto}`);

    let timeout;
    socket.onmessage = (event) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const data = JSON.parse(event.data);
        if (data[crypto]) {
          const newPrice = parseFloat(data[crypto]).toFixed(2);
          setCurrentPrice(newPrice);

          setCryptoData((prev) => {
            const updatedData = [...prev, { time: new Date().toLocaleTimeString(), price: newPrice }];
            return updatedData.length > 20 ? updatedData.slice(-20) : updatedData; // Efficiently keep max 20 points
          });
        }
      }, 500); // Debounce updates
    };

    return () => {
      socket.close();
    };
  }, [crypto]);

  const chartData = useMemo(() => ({
    labels: cryptoData.map((entry) => entry.time),
    datasets: [
      {
        label: `${crypto} Live Price (USD)`,
        data: cryptoData.map((entry) => entry.price),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  }), [cryptoData, crypto]);

  const options = useMemo(() => ({
    responsive: true,
    animation: {
      duration: 300,
      easing: "easeInOutQuart",
    },
    scales: {
      x: { type: "category" },
      y: { beginAtZero: false },
    },
  }), []);

  
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">{crypto} Live Price</h1>
      {currentPrice && <p className="text-lg text-blue-600">Current Price: ${currentPrice}</p>}
      <div className="w-full max-w-3xl mx-auto">
        {cryptoData.length > 0 ? <Line data={chartData} options={options} /> : <Loader/>}
      </div>
      <Link href="/" className="mt-5 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default CryptoDetails;
