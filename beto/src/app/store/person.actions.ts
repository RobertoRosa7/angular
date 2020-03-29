import { Action } from '@ngrx/store';
import { Person } from '../models/person';

export enum PersonActionsTypes {
    PERSON_ALL = '[PERSON_ALL] Get All people',
    PERSON_NEW = '[PERSON_NEW] Create new person',
    PERSON_UPDATE = '[PERSON_UPDATE] Update person',
    PERSON_DELETE = '[PERSON_DELETE] Delete person',
}

export class PersonAll implements Action {
    public readonly type = PersonActionsTypes.PERSON_ALL;
}
export class PersonNew implements Action {
    public readonly type = PersonActionsTypes.PERSON_NEW;
    constructor(public payload:{ person:Person }){  }
}
// SEM ENTITY
// export class PersonUpdate implements Action {
//     public readonly type = PersonActionsTypes.PERSON_UPDATE;
//     constructor(public payload:{ person:Person }){  }
// }

// COM ENTITY
export class PersonUpdate implements Action {
    public readonly type = PersonActionsTypes.PERSON_UPDATE;
    constructor(public payload:{ id:string, changes: Partial<Person> }){  }
}
export class PersonDelete implements Action {
    public readonly type = PersonActionsTypes.PERSON_DELETE;
    constructor(public payload:{ id:string }){  }
}

export type PersonActions = PersonAll | PersonNew | PersonUpdate | PersonDelete;