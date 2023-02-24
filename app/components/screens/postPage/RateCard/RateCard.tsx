import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import { useRateCard } from './useRateCard'
import StarRating from 'react-star-rating-component'

interface IRateMovie {
	id: string
}
import styles from './RateCard.module.scss'
const RateCard: FC<IRateMovie> = ({ id }) => {
	const { user } = useAuth()
	const { handleClick, isSended, rating } = useRateCard(id)
	return (
		<div className={styles.wrapper}>
			<h3>Вам понравилась работа фрилансера?</h3>
			<p>Ваша оценка поможет дальнейшему развитию</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>
							Thanks for rating
						</div>
					) : (
						<StarRating
							name='star-rating'
							value={rating}
							onStarClick={handleClick}
							emptyStarColor='#4f4f4f'
						/>
					)}
				</>
			) : (
				<div>Нужно зарегаться</div>
			)}
		</div>
	)
}

export default RateCard
