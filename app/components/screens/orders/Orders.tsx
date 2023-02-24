import Header from '@/components/layout/Header/Header'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import Heading from '@/components/ui/form-elemnts/heading/Heading'
import { OrderService } from '@/services/order.service'
import { IOrder } from '@/shared/types/order.types'
import { title } from 'process'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { useOrdersList } from '../admin/orders/useOrders'
import OrderItem from './OrderItem/OrderItem'
import styles from './Orders.module.scss'
const Orders: FC = () => {
	const { data: orders, isLoading: is } = useQuery('get all orders', () =>
		OrderService.getAll()
	)
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		dataForOrders
	} = useOrdersList()

	const orderCards: IOrder[] = dataForOrders.data ? dataForOrders.data : []
	return (
		<div className={styles.wrapper}>
			<Header />{' '}
			<div className={styles.search}>
				<AdminHeader
					handleSearch={handleSearch}
					searchTerm={searchTerm}
				/>
			</div>
			{orderCards.map((card) => (
				<OrderItem
					description={card.description}
					title={card.title}
					createdAt={card.createdAt}
					user={card.user}
					order_id={card.id}
				/>
			))}
		</div>
	)
}

export default Orders
