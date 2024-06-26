import { combineReducers } from "@reduxjs/toolkit"
import { sliceCounter } from "./counter"
import { sliceChange } from "./light/reducer"
import { sliceCustomers } from "./customers"
import { sliceSuppliers } from "./suppliers"
import { sliceResources } from "./resources"
import { sliceSkillsResources } from "./skillResource"
import { sliceCommesse } from "./commesse"
import { sliceOrders } from "./orders"
import { sliceAttività } from "./attività"
import { sliceFatturaAcquisti } from "./acquisti"
import { sliceFatturaAcquistiAttività } from "./fattureAcquistiAttività"
import { sliceFattureVendita } from "./fattureVendite"
import { sliceUsers } from "./utenti"

const rootReducer = combineReducers({
    counter: sliceCounter.reducer,
    light: sliceChange.reducer,
    customers : sliceCustomers.reducer,
    suppliers : sliceSuppliers.reducer,
    resources : sliceResources.reducer,
    skillResource : sliceSkillsResources.reducer,
    orders : sliceOrders.reducer,
    commesse : sliceCommesse.reducer,
    activities : sliceAttività.reducer,
    purchaseInvoice : sliceFatturaAcquisti.reducer,
    purchaseInvoiceActivity : sliceFatturaAcquistiAttività.reducer,
    salesInvoice : sliceFattureVendita.reducer,
    user : sliceUsers.reducer
})

export default rootReducer