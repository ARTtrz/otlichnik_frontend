import { CategoryService } from '@/services/category.service'
import { CityService } from '@/services/city.service'
import { useQuery } from 'react-query'
import { IOption } from '@/components/ui/select/select.interface'

export const useCreateCategories = () => {
	const queryData = useQuery(
		'all for create',
		() => CategoryService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(category): IOption => ({
						label: category.name,
						value: category.id
					})
				)
		}
	)

	return queryData
}
