import { getCategoriesUrl, getCitiesUrl } from '@/config/api.config'
import { ICategory } from '@/shared/types/category.types'
import { ICity } from '@/shared/types/city.types'
import { axiosClassic } from 'api/interceptors'
import axios from 'axios'

export const CityService = {
	async getAll() {
		return axiosClassic.get<ICity[]>(getCitiesUrl('/'))
	}
}
