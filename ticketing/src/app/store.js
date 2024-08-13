

import {configureStore} from "@reduxjs/toolkit";
import eventSlice from "./eventSlice";


export default configureStore({

    reducer:{
        "Event" : eventSlice
    }
})