import { Person } from '../models/person';
import { ActionReducerMap } from '@ngrx/store';
import * as fromPersonReducer from './person.reducer';

export interface AppState {
    people:Person[]
}

export const AppReducer:ActionReducerMap<AppState> = {
    people: fromPersonReducer.reducer
}