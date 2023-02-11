import { CategoryService } from '@/services/category.service'
import { CityService } from '@/services/city.service'
import { useQuery } from 'react-query'
import { IOption } from '@/components/ui/select/select.interface'
import { FormatService } from '@/services/format.service'

export const useCreateFormats = () => {
	const queryData = useQuery(
		'all create formats',
		() => FormatService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(format): IOption => ({
						label: format.name,
						value: format.id
					})
				)
		}
	)

	return queryData
}
