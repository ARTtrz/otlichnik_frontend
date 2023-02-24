import Layout from '@/components/layout/Layout'
import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import ReduxToast from './ReduxToast'
import { store } from '@/store/store'
import HeadProvider from './HeadProvider/HeadProvider'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import AuthProvider from './AuthProvider/AuthProvider'
export interface MainProviderProps {
	children: ReactNode
}
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

// const MainProvider: FC<MainProviderProps> = ({ children }) => {
// 	return (
// 		<HeadProvider>
// 			<Provider store={store}>
// 				<QueryClientProvider client={queryClient}>
// 					<ReduxToast />
// 					{children}
// 				</QueryClientProvider>
// 			</Provider>
// 		</HeadProvider>
// 	)
// }
const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<AuthProvider Component={Component} />
					{children}
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
