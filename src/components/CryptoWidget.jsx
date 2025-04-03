import { fetchCrypto } from "@/store/cryptoSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import Loader from "./Loader";

const Crypto = ()=>{
    const dispatch = useDispatch();
    const {data,loading,error} = useSelector((state)=> state.crypto);

    useEffect(()=>{

        dispatch(fetchCrypto())
    },[dispatch])

    if(loading) return <div><Loader/></div>

    if(error) return <div>Error: {error}</div>
    
    // if(data){
    //     console.log(data.bitcoin);
    // }
 
    return (
        <>
        <h2 className="text-2xl font-bold text-white mb-4 text-left tracking-wide">
  🚀 Crypto Prices
      </h2>

{data && (
  <div className="w-full p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl transition-transform duration-300 relative overflow-x-hidden mt-6">
    
    {/* Crypto List */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg text-white">
      {/* Bitcoin */}
      <Link href={`/crypto/bitcoin`}className="bg-gray-900/30 p-4 rounded-lg">
        <p className="flex justify-between items-center">
          <span>🟠 Bitcoin:</span>
          <span className="font-bold text-yellow-400">${data.bitcoin?.usd}</span>
        </p>
        <p className="text-sm mt-1">24h Change: 
          <span className={data.bitcoin?.usd_24h_change >= 0 ? "text-green-400" : "text-red-400"}>
            {data.bitcoin?.usd_24h_change?.toFixed(2)}%
          </span>
        </p>
        <p className="text-sm">Market Cap: 
          <span className="text-yellow-300"> ${data.bitcoin?.usd_market_cap?.toLocaleString()}</span>
        </p>
      </Link>

      {/* Ethereum */}
      <Link href={`/crypto/ethereum`} className="bg-gray-900/30 p-4 rounded-lg">
        <p className="flex justify-between items-center">
          <span>🔷 Ethereum:</span>
          <span className="font-bold text-blue-400">${data.ethereum?.usd}</span>
        </p>
        <p className="text-sm mt-1">24h Change: 
          <span className={data.ethereum?.usd_24h_change >= 0 ? "text-green-400" : "text-red-400"}>
            {data.ethereum?.usd_24h_change?.toFixed(2)}%
          </span>
        </p>
        <p className="text-sm">Market Cap: 
          <span className="text-blue-300"> ${data.ethereum?.usd_market_cap?.toLocaleString()}</span>
        </p>
      </Link>

      {/* Cardano */}
      <Link href={`/crypto/cardano`} className="bg-gray-900/30 p-4 rounded-lg">
        <p className="flex justify-between items-center">
          <span>🔵 Cardano:</span>
          <span className="font-bold text-green-400">${data.cardano?.usd}</span>
        </p>
        <p className="text-sm mt-1">24h Change: 
          <span className={data.cardano?.usd_24h_change >= 0 ? "text-green-400" : "text-red-400"}>
            {data.cardano?.usd_24h_change?.toFixed(2)}%
          </span>
        </p>
        <p className="text-sm">Market Cap: 
          <span className="text-green-300"> ${data.cardano?.usd_market_cap?.toLocaleString()}</span>
        </p>
      </Link>
    </div>

   
  </div>
)}

        </>
    )
}

export default Crypto;