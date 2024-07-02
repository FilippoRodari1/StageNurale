import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../applicationStore';

export const getSkillState = (state : RootState)=> state.skill
export const getSkillData = createSelector(
    getSkillState,
    (SkillState)=> SkillState.data
)
