import { createStore, combineReducers } from 'redux';
import forecastReducer from './reducers/forecastReducer';
const rootReducer = combineReducers(
{ forecastid: forecastReducer }
);
const configureStore = () => {
return createStore(rootReducer);
}
export default configureStore;