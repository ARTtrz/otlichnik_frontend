import { ICreateCard } from '@/components/screens/createCard/createCard.interface'
import { getCardsUrl } from '@/config/api.config'
import { ICard } from '@/shared/types/card.types'
import { axiosClassic } from 'api/interceptors'
import axios from '../api/interceptors'

export interface IFilterDto {
	city: string | undefined
	category: string | undefined
}
export interface IFavorite {
	cardId: number
	userId: number | undefined
}
export const CardService = {
	async getAll() {
		return axiosClassic.get<ICard[]>(getCardsUrl('/'))
	},

	async getAllByFilter(dto: IFilterDto) {
		return axiosClassic.get<ICard[]>(
			getCardsUrl(`/filter?city=${dto.city}&category=${dto.category}`)
		)
	},

	async getCardsByUser(userId: number) {
		return axios.get<ICard[]>(getCardsUrl(`/user/${userId}`))
	},

	async getById(id: number) {
		return axiosClassic.get<ICard>(getCardsUrl(`/${id}`))
	},

	async favorite(favDto: IFavorite) {
		return axios.post(getCardsUrl('/favorite'), favDto)
	},

	async unfavorite(favDto: IFavorite) {
		return axios.post(getCardsUrl('/unfavorite'), favDto)
	},

	async create(data: ICreateCard) {
		return axios.post<any>(getCardsUrl('/create'), data)
	},

	async update(id: number, data: ICreateCard) {
		return axios.put<ICard>(getCardsUrl(`/${id}`), data)
	},

	async updateViews(id: number) {
		return axiosClassic.put(getCardsUrl(`/update-views/${id}`))
	}
}
