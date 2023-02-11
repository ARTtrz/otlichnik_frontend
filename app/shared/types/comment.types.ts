import { IUser } from './user.types'

export interface IComment {
	id: number
	user: IUser
	post: number
	text: string
	createdAt: string
	updatedAt: string
}

export interface ICommentDto {
	text: string
	post: number
	user: IUser | null
}
