import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://newsdata.io/api/1/news?apikey=' +  process.env.NEXT_PUBLIC_NEWS_API + '&q=cryptocurrency';
export const fetchNews = createAsyncThunk("news/fetchNews",async()=>{
    
    const resp = await axios.get(BASE_URL);

    return resp.data;
})

const newsSlice = createSlice({
    name:"news",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchNews.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(fetchNews.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchNews.rejected,(state,action)=>{
            state.loading = false;
            state.error = null;
        })
    }
})


export default newsSlice.reducer