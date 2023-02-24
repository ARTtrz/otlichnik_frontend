import { ICard } from '@/shared/types/card.types'
import { IUser, IUserForComments } from '@/shared/types/user.types'

export interface IModal {
	description: string
	price: number
	order: number
	cards?: ICard[] | null
	user: IUser | null
}

export interface IModelCreate {
	description: string
	price: number
	order: number
	user: IUserForComments | null
}
