import { ICard } from './card.types'

export interface IUser {
	id: number
	avatar: string
	name: string
	email: string
	password: string
	createdAt: string
	isAdmin: boolean
	accessToken?: string
	refreshToken?: string
	cards?: ICard[]
	favorites?: ICard[]
}

export interface IUserForComments {
	id: number
	avatar: string
	name: string
	email: string
	password: string
	createdAt: string
	isAdmin: boolean
	accessToken?: string
	refreshToken?: string
}
