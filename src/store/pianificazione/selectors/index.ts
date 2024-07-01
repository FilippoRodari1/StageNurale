import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getPianificazioneState = (state : RootState)=> state.pienificazione
export const getPianificazioneData = createSelector(
    getPianificazioneState,
    (PianificazioneState)=>PianificazioneState.data
)
