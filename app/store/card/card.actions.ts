import { IFilter } from '@/components/screens/filter/filter.interface'
import { getCardsUrl } from '@/config/api.config'
import { CardService } from '@/services/card.service'
import { ICard } from '@/shared/types/card.types'
import { toastError } from '@/utils/toast-error'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClassic } from 'api/interceptors'

interface IResponse {
	cards: ICard[]
}
interface IInput {
	filter: IFilter
}

export const getByFilter = createAsyncThunk<ICard[], IInput>(
	'card/get-by-filter',
	async ({ filter }, thunkApi) => {
		try {
			const response = await axiosClassic.get(
				getCardsUrl(
					`/filter?city=${filter?.city}&category=${filter?.category}&from=${filter?.from}&to=${filter?.to}&format=${filter.format}`
				)
			)
			console.log('Response data', response.data)

			return response.data
		} catch (error) {
			toastError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)
