import { ICategory } from './category.types'
import { ICity } from './city.types'
import { IExperience } from './experience.types'
import { IUser } from './user.types'

export interface IPicture {
	id: string
	url: string
}

export interface ICard {
	id: string
	name: string
	phone_number: string
	description: string
	rate: number
	views: number
	owner: IUser
	images?: string[]
	middle_price: number
	age: number
	city?: ICity
	categories?: ICategory[]
	avatar: string
	experience?: IExperience
}
