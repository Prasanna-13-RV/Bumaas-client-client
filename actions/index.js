import { FORECAST_ID } from '../constants';
export function setForecastid(forecastid) {
return {
type: FORECAST_ID,
payload: forecastid
}
}