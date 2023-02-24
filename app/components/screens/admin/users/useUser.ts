import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { UserService } from '@/services/user.service'

import { toastError } from '@/utils/toast-error'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState(' ')
	const debouncedSearch = useDebounce(searchTerm, 500)
	console.log(debouncedSearch)
	const queryData = useQuery(
		['user list', debouncedSearch],
		() => UserService.getAllBySearch(debouncedSearch),

		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						id: user.id,
						editUrl: getAdminUrl(`user/edit/${user.id}`),
						items: [user.email, user.createdAt]
					})
				),

			onError: (error) => {
				toastError(error, 'User List')
			}
		}
	)

	console.log(queryData.data)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		console.log(queryData.data)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete user',
		(userId: string | number | undefined) =>
			UserService.deleteUser(userId),
		{
			onError: (error) => {
				toastError(error, 'Delete user')
			},

			onSuccess: () => {
				toastr.success('Delete User', 'delete was successfull')
				queryData.refetch()
			}
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync
		}),
		[queryData, searchTerm, deleteAsync]
	)
}
