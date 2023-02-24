import { useAuth } from '@/hooks/useAuth'
import { RatingService } from '@/services/rating.service'
import { toastError } from '@/utils/toast-error'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useRateCard = (cardId: string) => {
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)

	const { user } = useAuth()

	const { refetch } = useQuery(
		['your movie rating', cardId],
		() => RatingService.getByUserCard(cardId),
		{
			onSuccess: ({ data }) => {
				setRating(data)
			},

			onError: (error) => {
				toastError(error, 'Get user')
			},
			enabled: !!cardId && !!user
		}
	)

	const { mutateAsync } = useMutation(
		'set rating movie',
		({ value }: { value: number }) =>
			RatingService.setRating(cardId, value),
		{
			onError: (error) => {
				toastError(error, 'Rate movie')
			},

			onSuccess: () => {
				toastr.success('Rate movie', 'You have successfully rated')

				setIsSended(true)
				refetch()

				setTimeout(() => {
					setIsSended(false)
				}, 2400)
			}
		}
	)

	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await mutateAsync({ value: nextValue })
	}

	return { isSended, rating, handleClick }
}
