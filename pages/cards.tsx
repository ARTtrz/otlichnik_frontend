import Layout from '@/components/layout/Layout'
import Cards from '@/components/screens/cards/Cards'
import Meta from '@/utils/meta/Meta'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const CardsPage: NextPage = () => {
	const router = useRouter()
	const city = router.query.city
		? 'Cards in ' + String(router.query.city)
		: 'all cards'
	return (
		<Meta title={city}>
			<Layout>
				<Cards />
			</Layout>
		</Meta>
	)
}

export default CardsPage
