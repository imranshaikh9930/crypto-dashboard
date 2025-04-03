import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = createAsyncThunk("weather/fetchWeather",async(city)=>{

    const resp = await axios.get(`${BASE_URL}?q=${city}&appid=${process.env.NEXT_PUBLIC_WHEATHER_API}&units=metric`)

    return resp.data;
})  


const weatherSlice = createSlice({

    name:"weather",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchWeather.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchWeather.fulfilled,(state,action)=>{
            state.loading = false;
            const cityExists = state.data.some((city) => city.name === action.payload.name);
            if (!cityExists) {
                state.data = [...state.data, action.payload]; // Add only if city is new
            } else {
                state.data = state.data.map((city) =>
                    city.name === action.payload.name ? action.payload : city
                ); // Update existing city data
            }
        })
        .addCase(fetchWeather.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.error.message || "Failed to fetch data";
        })
    }
})

export default weatherSlice.reducer