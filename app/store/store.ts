import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { reducers } from './root-reducer'

export const store = configureStore({
	reducer: reducers,
	devTools: true
})

// TypedSelector
export type TypeRootState = ReturnType<typeof store.getState>
