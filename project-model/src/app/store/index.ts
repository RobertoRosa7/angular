import { Person } from '../models/person';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPersonReducer from '../reducers/person.reducer';
import * as fromUserReducer from '../reducers/user.reducer';

// SEM ENTITY
// export interface AppState {  people:Person[] }
// export const AppReducer:ActionReducerMap<AppState> = { people: fromPersonReducer.reducer }
// export const selectPeople = (state:AppState) => state.people;
// export const selectPeopleCount = createSelector(selectPeople, (people) => people.length)


// COM ENTITY
export interface AppState { 
    people:fromPersonReducer.PeopleState,
    users:fromUserReducer.UserState
};
export const AppReducer:ActionReducerMap<AppState> = { 
    people:fromPersonReducer.reducer,
    users:fromUserReducer.reducer
}
export const peopleState = createFeatureSelector<fromPersonReducer.PeopleState>('people');
export const usersState = createFeatureSelector<fromUserReducer.UserState>('users');

export const {selectAll,selectEntities,selectIds,selectTotal} = fromPersonReducer.peopleAdpter.getSelectors(peopleState);
export const usersStore = fromUserReducer.userAdapter.getSelectors(usersState);