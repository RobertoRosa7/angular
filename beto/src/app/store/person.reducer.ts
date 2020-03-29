import * as fromPersonActions from './person.actions';
import { Person } from '../models/person';

export const initializeState:Person[] = [];

export function reducer(state = initializeState, actions: fromPersonActions.PersonActions){
    switch(actions.type){
        case fromPersonActions.PersonActionsTypes.PERSON_ALL:
            return state;
        case fromPersonActions.PersonActionsTypes.PERSON_NEW:
            return state.concat([actions.payload.person]);
        case fromPersonActions.PersonActionsTypes.PERSON_UPDATE:
            const people = state.slice();
            const i = people.findIndex(p => p._id === actions.payload.person._id);
            if(i >= 0) people[i] = actions.payload.person;
            return people;
        case fromPersonActions.PersonActionsTypes.PERSON_DELETE:
            return state.filter(p => p._id != actions.payload.id);
        default:
            return state;
    }
}