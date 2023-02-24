import { CategoryService } from '@/services/category.service'
import { CityService } from '@/services/city.service'
import { useQuery } from 'react-query'
import { IOption } from '@/components/ui/select/select.interface'
import { FormatService } from '@/services/format.service'
import { ExperienceService } from '@/services/experience.service'

export const useExperience = () => {
	const queryData = useQuery(
		'all create experience for filter',
		() => ExperienceService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(experience): IOption => ({
						label: experience.name,
						value: experience.name
					})
				)
		}
	)

	return queryData
}
