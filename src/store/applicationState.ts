import { combineReducers } from "@reduxjs/toolkit"
import { sliceCounter } from "./counter"
import { sliceChange } from "./light/reducer"
import { sliceCustomers } from "./customers"
import { sliceSuppliers } from "./suppliers"
import { sliceResources } from "./resources"

const rootReducer = combineReducers({
    counter: sliceCounter.reducer,
    light: sliceChange.reducer,
    customers : sliceCustomers.reducer,
    suppliers : sliceSuppliers.reducer,
    resources : sliceResources.reducer
})

export default rootReducer