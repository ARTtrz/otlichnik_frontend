import AiMaterialIcon from '@/components/ui/AiMaterialIcon'
import { useAuth } from '@/hooks/useAuth'
import { CardService } from '@/services/card.service'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useQuery } from 'react-query'
import styles from './CreateButton.module.scss'
const FavoriteButtonHeader: FC = () => {
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
				onClick={() => router.push('/favorites')}
			>
				<AiMaterialIcon name='AiOutlineHeart' />
			</button>
		</div>
	)
}

export default FavoriteButtonHeader
