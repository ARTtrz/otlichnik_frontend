import { IModal } from '@/components/ui/modal/modal.interface'
import { getAnswerUrl } from '@/config/api.config'
import { getCardUrl } from '@/config/url.config'
import { IUser } from '@/shared/types/user.types'
import axios, { axiosClassic } from 'api/interceptors'

export interface IAnswer {
	price: number
	description: string
	order: number
	user: IUser
}

export const AnswerService = {
	async getAll() {
		return axiosClassic.get<IModal[]>(getAnswerUrl('/'))
	},

	async create(data: IModal) {
		return axios.post<IModal>(getAnswerUrl('/'), data)
	},

	async getById(id: number) {
		return await axios.get<IModal[]>(getAnswerUrl(`/${id}`))
	}
}
