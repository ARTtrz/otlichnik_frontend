import { CategoryService } from '@/services/category.service'
import { CityService } from '@/services/city.service'
import { useQuery } from 'react-query'
import { IOption } from '@/components/ui/select/select.interface'

export const useCities = () => {
	const queryData = useQuery('all cities', () => CityService.getAll(), {
		select: ({ data }) =>
			data.map(
				(city): IOption => ({
					label: city.name,
					value: city.name
				})
			)
	})

	return queryData
}
