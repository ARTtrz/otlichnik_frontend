import { useAuth } from '@/hooks/useAuth'
import { CardService } from '@/services/card.service'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useQuery } from 'react-query'
import styles from './CreateButton.module.scss'
const CreateButton: FC = () => {
	const router = useRouter()
	const { user } = useAuth()

	const { data: cards, isLoading: isCardsLoading } = useQuery(
		'current user cards',
		() => CardService.getCardsByUser(user ? user?.id : 19),
		{ select: ({ data }) => data }
	)

	return (
		<div>
			<button
				className={styles.button}
				onClick={() => router.push('/create-order')}
			>
				Оставить заявку
			</button>
			{cards?.length ? (
				<button
					className={styles.button}
					onClick={() =>
						router.push(`/post/edit/${cards[0].id}`)
					}
				>
					Обновить объявление
				</button>
			) : (
				<button
					className={styles.button}
					onClick={() => router.push('/create')}
				>
					Стать фрилансером
				</button>
			)}
		</div>
	)
}

export default CreateButton
