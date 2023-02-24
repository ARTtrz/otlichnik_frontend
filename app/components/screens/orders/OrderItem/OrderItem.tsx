import Button from '@/components/ui/form-elemnts/Button'
import { FC, useState } from 'react'
import { IOrderItem } from './orderItem.interface'
import styles from './OrderItem.module.scss'
import parse from 'html-react-parser'
import Modal from '@/components/ui/modal/Modal'
import { useRouter } from 'next/router'
import moment from 'moment'
import { formatDistance, subDays } from 'date-fns'
import { create } from 'domain'

const OrderItem: FC<IOrderItem> = ({
	description,
	user,
	views,
	createdAt,
	title,
	order_id
}) => {
	const router = useRouter()
	const [active, setActive] = useState(false)
	const data = new Date(createdAt)
		.toLocaleDateString()
		.split('.')
		.reverse()
		.join('')
	const time = String(new Date())

	return (
		<div className={styles.wrapper}>
			<div className={styles.order}>
				<h1>{title}</h1>
				<div className={styles.description}>
					{parse(description)}
				</div>

				<div className={styles.user}>{user?.name}</div>
				<div className={styles.bottom}>
					{router.asPath == '/' ? (
						<div>
							<Button onClick={() => setActive(true)}>
								Отправить ответ
							</Button>
							<Button
								onClick={() =>
									router.push(`/orders/${order_id}`)
								}
							>
								Подробнее
							</Button>
						</div>
					) : (
						<Button
							onClick={() =>
								router.push(`/answers/${order_id}`)
							}
						>
							Посмотреть ответы
						</Button>
					)}
					<div className={styles.created}>
						<div>{views}</div>
						{formatDistance(new Date(createdAt), new Date(), {
							addSuffix: true
						})}
					</div>
				</div>

				<Modal
					isActive={active}
					setActive={setActive}
					orderId={order_id}
				/>
			</div>
		</div>
	)
}

export default OrderItem
