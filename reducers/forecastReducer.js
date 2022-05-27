import { FORECAST_ID } from '../constants';
const initialState = {
forecastid:null
};
const forecastReducer = (state = initialState, action) => {
console.log(state);
switch(action.type) {
case FORECAST_ID:
return {
...state,
forecastid:action.payload
};
default:
return state;
}
}
export default forecastReducer;