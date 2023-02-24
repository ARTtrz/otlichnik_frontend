import '../app/assets/styles/globals.scss'

import type { AppProps } from 'next/app'
import MainProvider from 'providers/MainProvider'
import { useEffect, useState } from 'react'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'

type TypeAppProps = AppProps & TypeComponentAuthFields
export default function App({ Component, pageProps }: TypeAppProps) {
	const [showChild, setShowChild] = useState(false)
	useEffect(() => {
		setShowChild(true)
	}, [])

	if (!showChild) {
		return null
	}

	if (typeof window === 'undefined') {
		return <></>
	} else {
		return (
			<MainProvider Component={Component}>
				<Component {...pageProps} />
			</MainProvider>
		)
	}
}
