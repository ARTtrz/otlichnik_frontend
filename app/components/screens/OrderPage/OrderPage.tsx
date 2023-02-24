import { IOrder } from '@/shared/types/order.types'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import styles from './OrderPage.module.scss'
import parse from 'html-react-parser'

export interface IOrderPage {
	order: IOrder
}

const OrderPageItem: FC<IOrderPage> = ({ order }) => {
	return (
		<Meta title='Заказ'>
			<div className={styles.wrapper}>
				<div className={styles.title}>{order.title}</div>
				<div className={styles.description}>
					{parse(order.description)}
				</div>
			</div>
		</Meta>
	)
}

export default OrderPageItem
