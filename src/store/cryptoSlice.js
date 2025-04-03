import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd&include_market_cap=true&include_24hr_change=true';

export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto",async()=>{

    const resp = await axios.get(API_URL);
    
    return resp.data;
})

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{

        builder
        .addCase(fetchCrypto.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchCrypto.fulfilled,(state,action)=>{
            state.loading = false,
            state.data = action.payload;
        })
        .addCase(fetchCrypto.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message || "Failed to fetch data"
        })
    }
})

export default cryptoSlice.reducer;