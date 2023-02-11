import Layout from '@/components/layout/Layout'
import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import ReduxToast from './ReduxToast'
import { store } from '@/store/store'
import HeadProvider from './HeadProvider/HeadProvider'
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

const MainProvider: FC<MainProviderProps> = ({ children }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					{children}
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
