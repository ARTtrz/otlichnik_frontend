import { getCategoriesUrl } from '@/config/api.config'
import { ICategory } from '@/shared/types/category.types'
import { axiosClassic } from 'api/interceptors'
import axios from 'axios'

export const CategoryService = {
	async getAll() {
		return axiosClassic.get<ICategory[]>(getCategoriesUrl('/'))
	}
}
