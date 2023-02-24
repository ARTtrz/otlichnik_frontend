import { ICity } from '@/shared/types/city.types'

export interface ICardItem {
	id: string
	city: string | undefined
	name: string
	description: string
	rating: number
	middle_price: number
	views: number
	avatar: string
	phone: string
	rate: number
}
