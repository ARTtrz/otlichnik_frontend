import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'
import { getCardsUrl, getPostsUrl } from '@/config/api.config'
import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { CardService } from '@/services/card.service'

import { toastError } from '@/utils/toast-error'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useCardsList = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
	const queryData = useQuery(
		['movie list', debouncedSearch],
		() => CardService.getAllBySearch(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						id: movie.id,
						editUrl: getPostsUrl(`/edit/${movie.id}`),
						items: [
							movie.name,
							movie.phone_number,
							String(movie.rate)
						]
					})
				),

			onError: (error) => {
				toastError(error, 'Movie List')
			}
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		console.log(queryData.data)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete movie',
		(cardId: string | number | undefined) =>
			CardService.deleteCard(cardId),
		{
			onError: (error) => {
				toastError(error, 'Delete movie')
			},

			onSuccess: () => {
				toastr.success('Delete movie', 'delete was successfull')
				queryData.refetch()
			}
		}
	)

	const { push } = useRouter()

	// const { mutateAsync: createAsync } = useMutation(
	// 	'create movie',
	// 	() => CardService.create(),
	// 	{
	// 		onError(error) {
	// 			toastError(error, 'Create movie')
	// 		},
	// 		onSuccess({ data: _id }) {
	// 			toastr.success('Create movie', 'create was successful')
	// 			push(getAdminUrl(`movie/edit/${_id}`))
	// 		}
	// 	}
	// )

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
