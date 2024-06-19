import { createAction } from "@reduxjs/toolkit";

export const setCounter = createAction<number>('SET_COUNTER');

