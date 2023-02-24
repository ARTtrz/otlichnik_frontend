import { getRatingUrl } from '@/config/api.config'
import axios, { axiosClassic } from 'api/interceptors'

interface IRating {
	cardId: string
	value: number
}

export const RatingService = {
	async setRating(cardId: string, value: number) {
		return axios.post<number>(getRatingUrl('set-rating'), {
			cardId,
			value
		})
	},

	async getByUserCard(cardId: string) {
		return axios.get<number>(getRatingUrl(`by-user/${cardId}`))
	}
}
