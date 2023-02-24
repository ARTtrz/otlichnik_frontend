import { getCategoriesUrl, getCitiesUrl, getExUrl } from '@/config/api.config'
import { ICategory } from '@/shared/types/category.types'
import { ICity } from '@/shared/types/city.types'
import { IExperience } from '@/shared/types/experience.types'
import { axiosClassic } from 'api/interceptors'
import axios from 'axios'

export const ExperienceService = {
	async getAll() {
		return axiosClassic.get<IExperience[]>(getExUrl('/'))
	}
}
