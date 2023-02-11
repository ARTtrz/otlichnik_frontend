import '../app/assets/styles/globals.scss'

import type { AppProps } from 'next/app'
import MainProvider from 'providers/MainProvider'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
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
			<MainProvider>
				<Component {...pageProps} />
			</MainProvider>
		)
	}
}
