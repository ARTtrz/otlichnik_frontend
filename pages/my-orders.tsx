import Layout from '@/components/layout/Layout'
import Cards from '@/components/screens/cards/Cards'
import MyOrders from '@/components/screens/myOrders/MyOrders'
import Orders from '@/components/screens/orders/Orders'
import Meta from '@/utils/meta/Meta'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const MyOrdersPage: NextPage = () => {
	return (
		<Meta title='Мои запущенные заказы'>
			<MyOrders />
		</Meta>
	)
}

export default MyOrdersPage
