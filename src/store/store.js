import reducer from '../reducers/reducer';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

export const store = createStore(reducer, applyMiddleware(thunk));
