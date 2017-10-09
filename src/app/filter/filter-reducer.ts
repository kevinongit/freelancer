import { Action } from '@ngrx/store';

export interface IFilter {
    name: string,
    email: string
}

export const ACTIONS = {
    UPDATE_FILTER: 'UPDATE_FILTER',
    CLEAR_FILTER: 'CLEAR_FILTER',
}

const intialState = { name: '', email:'' };

export function filterReducer(
    state: IFilter = intialState,
    action: Action): IFilter {

    switch (action.type) {
        case ACTIONS.UPDATE_FILTER:
            // Create a new state from payload
            return Object.assign({}, action.payload);
        case ACTIONS.CLEAR_FILTER:
            // Create anew state from intial state
            return Object.assign({}, intialState);
        default:
            return state;
    }
}