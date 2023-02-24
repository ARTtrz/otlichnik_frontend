import { IUser } from '@/shared/types/user.types'

export interface IOrderItem {
	description: string
	user: IUser | null
	createdAt: string
	title: string
	order_id: number
	views: number
}

export interface IOrderItemUpdate {
	description: string
	title: string
}
