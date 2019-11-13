export default function(state = null, action) {
	switch (action.type) {
		case 'DRIVER_LOCATION':
			return action.payload.data;
	}
	return state;
}
