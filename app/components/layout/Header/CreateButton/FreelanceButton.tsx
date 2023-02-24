import AiMaterialIcon from '@/components/ui/AiMaterialIcon'
import MaterialIcon from '@/components/ui/MaterialIcon'
import { useAuth } from '@/hooks/useAuth'
import { CardService } from '@/services/card.service'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useQuery } from 'react-query'
import styles from './CreateButton.module.scss'
const FreelanceButton: FC = () => {
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
				onClick={() => router.push('/cards')}
			>
				<MaterialIcon name='MdPersonSearch' />
			</button>
		</div>
	)
}

export default FreelanceButton
