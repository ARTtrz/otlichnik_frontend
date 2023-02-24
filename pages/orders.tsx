import Layout from '@/components/layout/Layout'
import Cards from '@/components/screens/cards/Cards'
import Orders from '@/components/screens/orders/Orders'
import Meta from '@/utils/meta/Meta'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const OrdersPage: NextPage = () => {
	return (
		<Meta title='Заказы'>
			<Orders />
		</Meta>
	)
}

export default OrdersPage
