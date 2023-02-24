import { useQuery } from 'react-query'

import { UserService } from '@/services/user.service'

export const useProfileById = (userId: number) => {
	return useQuery(['get user', userId], () => UserService.getById(userId), {
		select: ({ data }) => data,
		enabled: !!userId
	})
}
