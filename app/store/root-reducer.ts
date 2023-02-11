import { reducer as toastrReducer } from 'react-redux-toastr'
import { reducer as userReducer } from './user/user.slice'
import { reducer as cardReducer } from './card/card.slice'
export const reducers = {
	toastr: toastrReducer,
	user: userReducer,
	card: cardReducer
}
