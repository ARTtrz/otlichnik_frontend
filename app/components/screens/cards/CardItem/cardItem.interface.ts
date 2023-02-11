import { ICity } from '@/shared/types/city.types'

export interface ICardItem {
	id: number
	city: string | undefined
	address: string
	title: string
	description: string
	rating: number
	middle_price: number
	views: number
	thumbnail: string
}
