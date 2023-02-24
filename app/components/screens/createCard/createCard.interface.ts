import { ICard } from '@/shared/types/card.types'
import { ICategory } from '@/shared/types/category.types'
import { ICity } from '@/shared/types/city.types'
import { IUser } from '@/shared/types/user.types'

export interface ICreateCard {
	name: string
	description: string
	categories: number[]
	city: number
	owner?: IUser | null | undefined
	middle_price: number
	age?: number
	avatar: string

	formats: number[]
	images?: string[]
	pictures?: { url: string }[]
}

export interface ICreateCardPage {
	name: string
	age: number
	owner?: IUser | null | undefined | any
	description: string
	categories: number[]
	city: number
	experience: number
	phone_number: string
	middle_price: number
	avatar: string
	formats: number[]
	images?: string[]
	pictures?: { url: string }[]
}

export interface IUpdateCardPage {
	name: string
	age: number
	experience: number
	description: string
	categories: number[]
	city: number

	phone_number: string
	middle_price: number
	avatar: string
	formats: number[]
	images?: string[]
	pictures?: { url: string }[]
}

export interface ICreateEditCard extends Omit<ICard, 'id'> {}
