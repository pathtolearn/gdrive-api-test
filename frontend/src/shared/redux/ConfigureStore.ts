// Dependencies
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../../store/Index';
// Root Reducer

export const configureStore = (initialState) => {
    const middleware = [
        thunk
    ];
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
}
