import Heading from '@/components/ui/form-elemnts/heading/Heading'
import { useAuth } from '@/hooks/useAuth'
import { OrderService } from '@/services/order.service'
import { FC } from 'react'
import { useQuery } from 'react-query'
import OrderItem from '../orders/OrderItem/OrderItem'

const MyOrders: FC = () => {
	const { data: orders, isLoading } = useQuery(
		'my orders',
		() => OrderService.getByUserId(),
		{
			select: ({ data }) => data
		}
	)
	const { user } = useAuth()
	// return (
	// 	<div>
	// 		{/* {orders ? (
	// 			orders.map((order) => (
	// 				<div>
	// 					<div>{order.title}</div>
	// 				</div>
	// 			))
	// 		) : (
	// 			<div>Hello</div>
	// 		)} */}
	// 		{orders.map((card) => (
	// 			<OrderItem
	// 				description={card.description}
	// 				title={card.title}
	// 				createdAt={card.createdAt}
	// 				user={card.user}
	// 				order_id={card.id}
	// 			/>
	// 		))}
	// 	</div>
	// )
	return orders ? (
		<>
			<Heading title='Мои заказы' />
			{orders.map((card) => (
				<OrderItem
					description={card.description}
					title={card.title}
					createdAt={card.createdAt}
					user={user}
					order_id={card.id}
				/>
			))}
		</>
	) : (
		<div>Net orders</div>
	)
}

export default MyOrders
