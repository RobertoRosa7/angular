import * as fromPersonActions from '../actions/person.actions';
import { Person } from '../models/person';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface PeopleState extends EntityState<Person> {}

export const peopleAdpter:EntityAdapter<Person> = createEntityAdapter<Person>();

export const initializeState:PeopleState = peopleAdpter.getInitialState({});
// export const initializeState:Person[] = [];

// MODELO COM USO DO ENTITY
export function reducer(state = initializeState, actions: fromPersonActions.PersonActions){
    switch(actions.type){
        case fromPersonActions.PersonActionsTypes.PERSON_NEW:
            return peopleAdpter.addOne(actions.payload.person, state);

        case fromPersonActions.PersonActionsTypes.PERSON_UPDATE:
            return peopleAdpter.updateOne({ "id":actions.payload.id, "changes":actions.payload.changes}, state);
        
        case fromPersonActions.PersonActionsTypes.PERSON_DELETE:
            return peopleAdpter.removeOne(actions.payload.id, state);
        
        default:
            return state;
    }
}

// MODELO DE REDUCER SEM USO DO ENTITY
// export function reducer(state = initializeState, actions: fromPersonActions.PersonActions){
//     switch(actions.type){
//         case fromPersonActions.PersonActionsTypes.PERSON_ALL:
//             return state;
//         case fromPersonActions.PersonActionsTypes.PERSON_NEW:
//             return state.concat([actions.payload.person]);
//         case fromPersonActions.PersonActionsTypes.PERSON_UPDATE:
//             const people = state.slice();
//             const i = people.findIndex(p => p._id === actions.payload.person._id);
//             if(i >= 0) people[i] = actions.payload.person;
//             return people;
//         case fromPersonActions.PersonActionsTypes.PERSON_DELETE:
//             return state.filter(p => p._id != actions.payload.id);
//         default:
//             return state;
//     }
// }