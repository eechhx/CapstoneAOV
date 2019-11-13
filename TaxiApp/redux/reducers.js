import { combineReducers } from 'redux';
import DriversDestination from './sample_drivers_destination';
import ActiveDestination from './reducer_active_destination';

const reducers = combineReducers({
	destination: DriversDestination,
	activeDestination: ActiveDestination
});

export default reducers;
