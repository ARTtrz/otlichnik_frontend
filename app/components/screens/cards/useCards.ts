import { CardService, IFilterDto } from '@/services/card.service'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

export const useCards = () => {
	const router = useRouter()
	const query: IFilterDto = {
		category: '',
		city: ''
	}
	useEffect(() => {
		const param: IFilterDto = {
			city: String(router.query.city),
			category: String(router.query.category)
		}
		query.category = param.category
		query.city = param.city
		console.log('PARAM', param)
	}, [router.query])

	const queryData = useQuery(
		'get all cards',
		() => CardService.getAllByFilter(query),
		{
			select: ({ data }) => data
		}
	)

	return queryData
}
