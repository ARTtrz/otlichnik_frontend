import { CategoryService } from '@/services/category.service'
import { CityService } from '@/services/city.service'
import { useQuery } from 'react-query'
import { IOption } from '@/components/ui/select/select.interface'
import { ExperienceService } from '@/services/experience.service'

export const useCreateExperiences = () => {
	const queryData = useQuery(
		'all create experiences',
		() => ExperienceService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(city): IOption => ({
						label: city.name,
						value: city.id
					})
				)
		}
	)

	return queryData
}
