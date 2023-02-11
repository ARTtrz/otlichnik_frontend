import { ICard } from './card.types'

export interface IUser {
	id: number
	name: string
	email: string
	password: string
	createdAt: string
	isAdmin: boolean
	accessToken?: string
	refreshToken?: string
	favorites?: ICard[]
}
