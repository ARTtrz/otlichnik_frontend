import { ICategory } from '@/shared/types/category.types'
import { FC, useEffect } from 'react'
import { useCategories } from './useCategories'
import styles from './Filter.module.scss'
import dynamic from 'next/dynamic'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IFilter } from './filter.interface'
import { useCities } from './useCities'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Button from '@/components/ui/form-elemnts/Button'
import { useRouter } from 'next/router'

import { UseActions } from '@/hooks/useActions'
import Field from '@/components/ui/form-elemnts/Field'
import { useCreateFormats } from './useCreateFormats'
import { useFormats } from './useFormats'
const DynamicSelect = dynamic(() => import('@/components/ui/select/Select'), {
	ssr: false
})

const Filter: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm<IFilter>({
		mode: 'onChange'
	})

	const { isLoading: isCategoriesLoading, data: categories } =
		useCategories()

	const { isLoading: isCitiesLoading, data: cities } = useCities()
	const { isLoading: isFormatsLoading, data: formats } = useFormats()

	const router = useRouter()
	const { getByFilter } = UseActions()
	const onSubmit: SubmitHandler<IFilter> = (data) => {
		console.log(data)
		router.push({
			pathname: '/cards',
			query: {
				category: data.category,
				city: data.city,
				from: data.from,
				to: data.to,
				format: data.format
				// isOnline: data.isOnline,
				// isOffline: data.isOffline
			}
		})
	}

	useEffect(() => {
		const filter: IFilter = {
			category: String(router.query.category),
			city: String(router.query.city),
			// to: router.query.to == '' ? Number(router.query.to) : 21000,
			// from: router.query.from == '' ? Number(router.query.from) : 0,
			to: router.query.to == undefined ? '1' : router.query.to,
			from: router.query.from == undefined ? '1' : router.query.from,
			format: String(router.query.format)
			// isOffline: Boolean(router.query.isOffline),
			// isOnline: Boolean(router.query.isOnline)
		}
		console.log(typeof filter.from, filter.to)
		getByFilter({ filter })
	}, [router.query])
	return (
		<div className={styles.filter}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{isCitiesLoading ? (
					<SkeletonLoader count={5} />
				) : (
					<>
						<div className={styles.fields}>
							<Controller
								control={control}
								name='city'
								render={({
									field,
									fieldState: { error }
								}) => (
									<DynamicSelect
										defaultValue={String(
											router.query.city
										)}
										field={field}
										options={cities || []}
										isLoading={isCitiesLoading}
										placeholder='City'
										error={error}
										empty_space='Выберите город'
									/>
								)}
							/>
							<div className={styles.cat}>
								<Controller
									control={control}
									name='category'
									render={({
										field,
										fieldState: { error }
									}) => (
										<DynamicSelect
											defaultValue={String(
												router.query
													.category
											)}
											field={field}
											options={
												categories || []
											}
											isLoading={
												isCategoriesLoading
											}
											placeholder='Category'
											error={error}
											empty_space='Выберите категорию'
										/>
									)}
								/>
							</div>
							<div className={styles.format}>
								<Field
									{...register('from')}
									placeholder='From'
								/>
								<Field
									{...register('to')}
									placeholder='to'
								/>
							</div>
							<Controller
								control={control}
								name='format'
								render={({
									field,
									fieldState: { error }
								}) => (
									<DynamicSelect
										defaultValue={String(
											router.query.format
										)}
										field={field}
										options={formats || []}
										isLoading={isFormatsLoading}
										placeholder='Format'
										error={error}
										empty_space='Выберите формат'
									/>
								)}
							/>
						</div>

						{/* <Button className={styles.submit}>Найти</Button> */}
						<button className={styles.btn}>
							<span>Найти</span>
						</button>
					</>
				)}
			</form>
		</div>
	)
}

export default Filter
