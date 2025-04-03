import { fetchCrypto } from "@/store/cryptoSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Crypto = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.crypto);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteCrypto")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    dispatch(fetchCrypto());
  }, [dispatch]);

  // Toggle favorite
  const toggleFavorite = (crypto) => {
    let updatedFavorites;
    if (favorites.includes(crypto)) {
      updatedFavorites = favorites.filter((fav) => fav !== crypto);
    } else {
      updatedFavorites = [...favorites, crypto];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteCrypto", JSON.stringify(updatedFavorites));
  };

  if (loading) return <div><Loader /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-4 text-left tracking-wide">
        🚀 Crypto Prices
      </h2>

      {/* Favorite Cryptos */}
      {favorites.length > 0 && (
        <div className="mb-6 p-4 bg-gray-800  backdrop-blur-lg border border-yellow-400/50 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">⭐ Favorite Cryptos</h3>
          <div className="flex flex-wrap gap-4">
            {favorites.map((crypto) => (
              <span key={crypto} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-full">
                {crypto}
              </span>
            ))}
          </div>
        </div>
      )}

      {data && (
        <div className="w-full p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl transition-transform duration-300 relative overflow-x-hidden mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg text-white">
            {["bitcoin", "ethereum", "cardano"].map((crypto) => (
              <div key={crypto} className="bg-gray-900/30 p-4 rounded-lg relative">
                <button
                  onClick={() => toggleFavorite(crypto)}
                  className="absolute bottom-2 right-2 text-xl  text-red-500 hover:text-red-700"
                >
                  {favorites.includes(crypto) ? <FaHeart /> : <FaRegHeart />}
                </button>
                <Link href={`/crypto/${crypto}`} className="block">
                  <p className="flex justify-between items-center">
                    <span>
                      {crypto === "bitcoin" && "🟠 Bitcoin:"}
                      {crypto === "ethereum" && "🔷 Ethereum:"}
                      {crypto === "cardano" && "🔵 Cardano:"}
                    </span>
                    <span className="font-bold text-yellow-400">${data[crypto]?.usd}</span>
                  </p>
                  <p className="text-sm mt-1">
                    24h Change:
                    <span className={data[crypto]?.usd_24h_change >= 0 ? "text-green-400" : "text-red-400"}>
                      {data[crypto]?.usd_24h_change?.toFixed(2)}%
                    </span>
                  </p>
                  <p className="text-sm">
                    Market Cap:
                    <span className="text-yellow-300">
                      ${data[crypto]?.usd_market_cap?.toLocaleString()}
                    </span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Crypto;
