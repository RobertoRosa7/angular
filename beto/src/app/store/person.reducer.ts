import * as fromPersonActions from './person.actions';
import { State } from '@ngrx/store';
import { Person } from '../models/person';

export const initializeState:Person[] = [];

export function reducer(State = initializeState, actions: fromPersonActions.PersonActions){
    switch(actions.type){
        case fromPersonActions.PersonActionsTypes.PERSON_ALL:
            return State;
        case fromPersonActions.PersonActionsTypes.PERSON_NEW:
            return State.concat([actions.payload.person]);
        case fromPersonActions.PersonActionsTypes.PERSON_UPDATE:
            const people = State.slice();
            const i = people.findIndex(p => p._id === actions.payload.person._id);
            if(i >= 0) people[i] = actions.payload.person;
            return people;
        case fromPersonActions.PersonActionsTypes.PERSON_DELETE:
            return State.filter(p => p._id != actions.payload.id);
        default:
            return State;
    }
}