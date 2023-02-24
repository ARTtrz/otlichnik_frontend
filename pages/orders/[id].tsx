import OrderPageItem, {
	IOrderPage
} from '@/components/screens/OrderPage/OrderPage'
import { OrderService } from '@/services/order.service'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { FC } from 'react'

const OrderPage: NextPage<IOrderPage> = ({ order }) => {
	return (
		<>{order ? <OrderPageItem order={order} /> : <div>Not Found</div>}</>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: order } = await OrderService.getById(
			params ? Number(params.id) : 0
		)

		return {
			props: {
				order
			},
			revalidate: 60
		}
	} catch (error) {
		return {
			notFound: true
		}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: orders } = await OrderService.getAll()
		const paths = orders.map((c) => ({
			params: { id: String(c.id) }
		}))

		return {
			paths,
			fallback: 'blocking'
		}
	} catch (error) {
		return {
			fallback: false,
			paths: []
		}
	}
}

export default OrderPage
