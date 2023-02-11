import { getCategoriesUrl, getFormatsUrl } from '@/config/api.config'
import { ICategory } from '@/shared/types/category.types'
import { IFormat } from '@/shared/types/format.types'
import { axiosClassic } from 'api/interceptors'
import axios from 'axios'

export const FormatService = {
	async getAll() {
		return axiosClassic.get<IFormat[]>(getFormatsUrl('/'))
	}
}
