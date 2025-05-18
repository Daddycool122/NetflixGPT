import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        geminiMovies: [],
        geminiMovieNames: []
    },
    reducers:{
        toggleGptSearchView:(state)=>{
            state.showGptSearch= !state.showGptSearch;
        },
        addGeminiMovieResult: (state,action)=>{
            state.geminiMovies= action.payload;
        },
        addGeminiMovieNames: (state,action)=>{
            state.geminiMovieNames= action.payload;
        },

    }
})

export const {toggleGptSearchView,addGeminiMovieResult,addGeminiMovieNames}= gptSlice.actions
export default gptSlice.reducer