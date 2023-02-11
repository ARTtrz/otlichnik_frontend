import {
	getCategoriesUrl,
	getFormatsUrl,
	getUsersUrl
} from '@/config/api.config'
import { ICard } from '@/shared/types/card.types'
import { ICategory } from '@/shared/types/category.types'
import { IFormat } from '@/shared/types/format.types'
import { IUser } from '@/shared/types/user.types'
import { axiosClassic } from 'api/interceptors'
import axios from 'api/interceptors'

export const UserService = {
	async getAll() {
		return axios.post(getUsersUrl('/'))
	},

	async getById(id: number) {
		return axios.get<IUser>(getUsersUrl(`/${id}`))
	}
}
