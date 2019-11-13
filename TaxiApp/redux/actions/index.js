import axios from 'axios';
import { destination } from '../data/sample_destinations';

export function selectDestination(title) {
    console.log(title)
	return {
		type: 'DESTINATION_SELECTED',
		payload: destination[title]
	};
}

export function selectDriver(driver) {
	return {
		type: 'DRIVER_SELECTED',
		payload: driver
	};
}

