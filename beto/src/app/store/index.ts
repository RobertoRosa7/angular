import { Person } from '../models/person';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromPersonReducer from './person.reducer';

export interface AppState {  people:Person[] }

export const AppReducer:ActionReducerMap<AppState> = { people: fromPersonReducer.reducer }

export const selectPeople = (state:AppState) => state.people;

export const selectPeopleCount = createSelector(selectPeople, (people) => people.length)