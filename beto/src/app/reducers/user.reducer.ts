import * as fromUserActions from '../actions/user.actions';
import { PersonFirestore } from '../models/person';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { UserFirestore } from '../models/user';

export interface UserState extends EntityState<UserFirestore> {};
export const userAdapter:EntityAdapter<UserFirestore> = createEntityAdapter<UserFirestore>();
export const initializeState:UserState = userAdapter.getInitialState({});

export function reducer(state = initializeState, actions:fromUserActions.UserActions){
    switch(actions.type){
        case fromUserActions.UserActionsTypes.USER_NEW:
            return userAdapter.addOne(actions.payload.user, state);
        case fromUserActions.UserActionsTypes.USER_UP:
            return userAdapter.updateOne({"id":actions.payload.id, "changes":actions.payload.changes}, state);
        case fromUserActions.UserActionsTypes.USER_DEL:
            return userAdapter.removeOne(actions.payload.id, state);
        default:
            return state;
    }
}