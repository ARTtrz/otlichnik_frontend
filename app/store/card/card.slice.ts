import { ICard } from '@/shared/types/card.types'
import { createSlice } from '@reduxjs/toolkit'
import { BlobOptions } from 'buffer'
import { userSlice } from '../user/user.slice'
import { getByFilter } from './card.actions'

interface IInitial {
	isLoading: boolean
	cards: ICard[]
}
const initialState: IInitial = {
	isLoading: false,
	cards: []
}

export const cardSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getByFilter.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getByFilter.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.cards = payload
			})
			.addCase(getByFilter.rejected, (state, { payload }) => {
				state.isLoading = false
				state.cards = []
			})
	}
})

export const { reducer } = cardSlice
