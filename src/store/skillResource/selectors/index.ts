import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getSkillResourceState = (state : RootState)=> state.skillResource
export const getSkillResourceData = createSelector(
    getSkillResourceState,
    (SkillResourceState)=> SkillResourceState.data
)
