import { createSlice } from "@reduxjs/toolkit";


const initialState={
    event:[]
}


const eventSlice = createSlice({
   
    name:"tickets",
    initialState , 
    reducers:{
      setEvents:(state,action)=>{
        state.event = action.payload
      }, 
      createEvent:(state,action)=>{
        state.event.push(action.payload)
      }
    }
})


export const {setEvents,createEvent} = eventSlice.actions ;
export default eventSlice.reducer