import Layout from '@/components/layout/Layout'
import Button from '@/components/ui/form-elemnts/Button'
import Field from '@/components/ui/form-elemnts/Field'
import UploadField from '@/components/ui/form-elemnts/uploadField/UploadField'
import { CardService } from '@/services/card.service'
import Meta from '@/utils/meta/Meta'
import { getKeys } from '@/utils/object/getKeys'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { stripHtml } from 'string-strip-html'
import { ICreateCard } from '../../createCard/createCard.interface'
import { useCreateCategories } from '../../filter/useCreateCategories'
import { useCreateCities } from '../../filter/useCreateCities'
import { useCreateFormats } from '../../filter/useCreateFormats'
import styles from './CardEdit.module.scss'

const DynamicSelect = dynamic(() => import('@/components/ui/select/Select'), {
	ssr: false
})

const DynamicTextEditor = dynamic(
	() => import('@/components/ui/form-elemnts/TextEditor'),
	{
		ssr: false
	}
)

const CardEdit: FC = () => {
	const { query } = useRouter()
	const cardId = Number(query.id)
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm<ICreateCard>({
		mode: 'onChange'
	})

	const { data: card, isLoading } = useQuery(
		['get card by id', cardId],
		() => CardService.getById(cardId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			}
		}
		// { select: ({ data }) => data }
	)

	const { mutate } = useMutation(
		['update card', cardId],
		(data: ICreateCard) => CardService.update(cardId, data)
	)

	const onSubmit: SubmitHandler<ICreateCard> = (data) => {
		mutate(data)
	}

	const { isLoading: isCityLoading, data: cities } = useCreateCities()
	const { isLoading: isCategoriesLoading, data: categories } =
		useCreateCategories()
	const { isLoading: isFormatsLoading, data: formats } = useCreateFormats()

	return (
		<Meta title='Edit Page'>
			<div>
				{isLoading ? (
					<p>Loading</p>
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.fields}>
							<Field
								{...register('title', {
									required: 'Title is required'
								})}
								placeholder='Title'
								error={errors.title}
								style={{ width: '31%' }}
							/>

							<Field
								{...register('address', {
									required: 'Address is required'
								})}
								placeholder='Address'
								error={errors.address}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('middle_price', {
									required:
										'Middle price is required'
								})}
								placeholder='Middle price'
								error={errors.middle_price}
								style={{ width: '31%' }}
							/>
							<Controller
								control={control}
								name='thumbnail'
								defaultValue=''
								render={({
									field: {
										value,
										onChange // value - текущее состояние
									},
									fieldState: { error }
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										placeholder='Thumbnail'
									/>
								)}
								rules={{
									required: 'Thumbnail is required'
								}}
							/>

							<Controller
								control={control}
								name='city'
								render={({
									field,
									fieldState: { error }
								}) => (
									<DynamicSelect
										field={field}
										options={cities || []}
										isLoading={isCityLoading}
										placeholder='City'
										error={error}
										defaultValue={''}
										empty_space={''}
									/>
								)}
								rules={{
									required: 'City is required'
								}}
							/>

							<Controller
								control={control}
								name='categories'
								render={({
									field,
									fieldState: { error }
								}) => (
									<DynamicSelect
										field={field}
										options={categories || []}
										isLoading={
											isCategoriesLoading
										}
										placeholder='Categories'
										error={error}
										isMulti
										defaultValue={''}
										empty_space={''}
									/>
								)}
								rules={{
									required: 'Category is required'
								}}
							/>

							<Controller
								control={control}
								name='formats'
								render={({
									field,
									fieldState: { error }
								}) => (
									<DynamicSelect
										field={field}
										options={formats || []}
										isLoading={isFormatsLoading}
										placeholder='Format'
										error={error}
										isMulti
										defaultValue={''}
										empty_space={''}
									/>
								)}
								rules={{
									required: 'Category is required'
								}}
							/>
							<Controller
								control={control}
								name='description'
								defaultValue=''
								render={({
									field: { value, onChange },
									fieldState: { error }
								}) => (
									<DynamicTextEditor
										onChange={onChange}
										value={value}
										error={error}
										placeholder='Description'
									/>
								)}
								rules={{
									validate: {
										required: (v) =>
											(v &&
												stripHtml(v).result
													.length > 0) ||
											'Description is required'
									}
								}}
							/>
						</div>

						<Button type='submit'>Create</Button>
					</form>
				)}
			</div>
		</Meta>
	)
}

export default CardEdit
