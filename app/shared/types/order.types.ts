import { IUser } from './user.types'

export interface IOrder {
	id: number
	title: string
	createdAt: string
	description: string
	user: IUser
}
