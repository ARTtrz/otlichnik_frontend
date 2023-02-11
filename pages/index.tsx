import Layout from '@/components/layout/Layout'
import Home from '@/components/screens/home/Home'
import Link from 'next/link'

export default function HomePage() {
	return (
		<>
			<Home />
			<Link href='/cards'>Cards</Link>
		</>
	)
}
