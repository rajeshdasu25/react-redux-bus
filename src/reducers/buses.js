import { FETCH_ALL_BUSES } from '../actions/types';

export default function categoryReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_BUSES:
            return action.buses;
        default:
            return state;
    }
}