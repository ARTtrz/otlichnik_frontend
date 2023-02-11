import { ICategory } from './category.types'
import { ICity } from './city.types'

export interface IPicture {
	id: string
	url: string
}

export interface ICard {
	id: number
	title: string
	work_time: string
	description: string
	rating: number
	views: number
	images?: string[]
	middle_price: number
	address: string
	city?: ICity
	categories?: ICategory[]
	thumbnail: string
}
