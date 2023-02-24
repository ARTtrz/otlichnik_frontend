import { IUser, IUserForComments } from '@/shared/types/user.types'

export interface IOrderCreate {
	description: string
	title: string
	user: IUserForComments | null
}
