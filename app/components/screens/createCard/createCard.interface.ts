import { ICategory } from '@/shared/types/category.types'
import { ICity } from '@/shared/types/city.types'
import { IUser } from '@/shared/types/user.types'

export interface ICreateCard {
	title: string
	work_time: string
	description: string
	categories: number[]
	owner?: IUser | null
	city: number
	address: string
	rating: number
	middle_price: number
	thumbnail: string
	formats: number[]
	images: string[]
	pictures?: { url: string }[]
}
