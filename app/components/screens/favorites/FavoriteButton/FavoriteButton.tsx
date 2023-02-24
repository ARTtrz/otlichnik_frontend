import { useAuth } from '@/hooks/useAuth'
import { CardService, IFavorite } from '@/services/card.service'
import { toastError } from '@/utils/toast-error'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { IFilter } from '../../filter/filter.interface'
import { useFavorites } from '../useFavorites'
import cn from 'classnames'
import styles from './FavoriteButton.module.scss'
import { toastr } from 'react-redux-toastr'
const FavoriteButton: FC<{ cardId: string }> = ({ cardId }) => {
	const [isSmashed, setIsSmashed] = useState(false)
	const { user } = useAuth()
	const { favoriteCards, refetch } = useFavorites(user ? user.id : 17)
	console.log(favoriteCards?.length)
	const data: IFavorite = {
		cardId: cardId,
		userId: user?.id
	}
	useEffect(() => {
		if (!favoriteCards) return

		const isHasMovie = favoriteCards.some((f) => f.id == cardId)

		if (isSmashed != isHasMovie) setIsSmashed(isHasMovie)
	}, [favoriteCards, isSmashed, cardId])

	const { mutateAsync: favoriteAsync } = useMutation(
		'favorite',
		() => CardService.favorite(data),
		{
			onError: (error) => {
				toastError(error, 'Update favorite list')
			},

			onSuccess: () => {
				toastr.success('Registration', 'Completed successfully')
				setIsSmashed(!isSmashed)
				refetch()
			}
		}
	)
	const { mutateAsync: unfavoriteAsync } = useMutation(
		'favorite',
		() => CardService.unfavorite(data),
		{
			onError: (error) => {
				toastError(error, 'Remove favorite list')
			},

			onSuccess: () => {
				toastr.success('Registration', 'Completed successfully')
				setIsSmashed(!isSmashed)
				refetch()
			}
		}
	)

	return (
		<button
			onClick={() =>
				isSmashed == true ? unfavoriteAsync() : favoriteAsync()
			}
			className={cn(styles.button, {
				[styles.animate]: isSmashed
			})}
		></button>
	)
}

export default FavoriteButton
