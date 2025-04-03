import { useEffect,useState } from "react";

const useWebSocket = (url)=>{
    const [data,setData] = useState(null);

    useEffect(()=>{

        const socket = new WebSocket(url);
        

        socket.onmessage = (e)=>{
            const message = JSON.parse(e.data);
            setData(message);
        }

        return ()=>{

            socket.close();
        }
        
    },[url])

    return data;
}

export default useWebSocket;