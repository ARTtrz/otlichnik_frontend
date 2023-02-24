import Layout from '@/components/layout/Layout'
import Cards from '@/components/screens/cards/Cards'
import { NextPageAuth } from '@/shared/types/auth.types'
import Meta from '@/utils/meta/Meta'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const CardsPage: NextPageAuth = () => {
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

CardsPage.isOnlyUser

export default CardsPage
