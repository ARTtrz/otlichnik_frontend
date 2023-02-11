import * as UserActions from './user/user.actions'
import * as CardActions from './card/card.actions'
export const allActions = {
	...UserActions,
	...CardActions
}
