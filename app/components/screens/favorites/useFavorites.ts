import { UserService } from '@/services/user.service'
import { useQuery } from 'react-query'

export const useFavorites = (userId: number) => {
	const {
		isLoading,
		data: favoriteCards,
		refetch
	} = useQuery('favorite cards', () => UserService.getById(userId), {
		select: ({ data }) => data.favorites
	})

	return {
		isLoading,
		favoriteCards,
		refetch
	}
}
