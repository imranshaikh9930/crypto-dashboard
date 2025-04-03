import { fetchNews } from '@/store/newsSlice'
import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Loader from './Loader';
import defaultImage from "../../public/network-connection-graphic-overlay-background-computer-screen.jpg";



const News = ()=>{
    const dispatch = useDispatch();

    const {data,loading,error} = useSelector((state)=> state.news);

    useEffect(()=>{
        dispatch(fetchNews());
    },[dispatch])


    if(loading) return <div><Loader/></div>

    if(error) return <div>Error: {error}</div>

    // if(data){
    //     console.log(data);
    // }
    return (
        <div>
             <h2 className="text-xl font-semibold mb-3">📰 News</h2>
        {data && (
            <div className="overflow-x-auto flex flex-wrap gap-6 py-6 justify-start ">
              {data?.results?.slice(0, 5).map((article, index) => (
                <div key={index} 
                     className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 min-w-[280px] sm:min-w-[300px] md:min-w-[350px] max-w-sm">
                  {/* News Image */}
                  {article?.image_url && (
                <img 
                src={article?.image_url && article.image_url.trim() !== "" ? article.image_url : defaultImage} 
                alt="News Image" 
                className="w-full h-40 object-cover rounded-lg mb-3"
                onError={(e) => {
                  e.target.onerror = null; // Infinite loop avoid karne ke liye
                  e.target.src = defaultImage;
                }}
              />
                  )}
          
                  {/* News Title */}
                  <a href={article.link} target="_blank" rel="noopener noreferrer" 
                     className="text-lg font-semibold text-white hover:text-blue-300 transition-colors duration-200">
                    {article.title.length > 50 ? article.title.slice(0, 50) + "..." : article.title}
                  </a>
                </div>
              ))}
            </div>
          )}
          </div>
          
    )
}

export default News;