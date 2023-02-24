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
import {
	Controller,
	SubmitHandler,
	useFieldArray,
	useForm
} from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { stripHtml } from 'string-strip-html'
import {
	ICreateCard,
	ICreateCardPage,
	IUpdateCardPage
} from '../../createCard/createCard.interface'
import { useCreateCategories } from '../../filter/useCreateCategories'
import { useCreateCities } from '../../filter/useCreateCities'
import { useCreateExperiences } from '../../filter/useCreateExperience'
import { useCreateFormats } from '../../filter/useCreateFormats'
import styles from './CardEdit.module.scss'
import { useCardEdit } from './useCardEdit'

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
	// const { query } = useRouter()
	// const cardId = String(query.id)
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm<IUpdateCardPage>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit } = useCardEdit(setValue)
	// const { push } = useRouter()

	// const { data: cardForEdit, isLoading } = useQuery(
	// 	['get card by id ok', cardId],
	// 	() => CardService.getById(cardId),
	// 	{
	// 		onSuccess({ data }) {
	// 			getKeys(data).forEach((key) => {
	// 				setValue(key, data[key])
	// 			})
	// 		},
	// 		enabled: !!query.id
	// 	}
	// 	// { select: ({ data }) => data }
	// )

	// const { mutateAsync } = useMutation(
	// 	['update card', cardId],
	// 	(data: ICreateCard) => CardService.update(cardId, data),
	// 	{
	// 		onSuccess() {
	// 			toastr.success('Update card', 'update was successful')
	// 			push('/')
	// 		}
	// 	}
	// )

	// const onSubmit: SubmitHandler<ICreateCard> = (data) => {
	// 	console.log(data)
	// 	alert('submit')
	// 	mutateAsync(data)
	// }

	const { fields, append, remove } = useFieldArray({
		name: 'pictures',
		control
	})
	const { isLoading: isCityLoading, data: cities } = useCreateCities()
	const { isLoading: isCategoriesLoading, data: categories } =
		useCreateCategories()
	const { isLoading: isExLoading, data: experiences } =
		useCreateExperiences()
	const { isLoading: isFormatsLoading, data: formats } = useCreateFormats()

	return (
		<Meta title='Edit Page'>
			<div>
				{isLoading ? (
					<p>Loading</p>
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.fields}>
							<div>
								{fields.map((field, index) => (
									<div key={field.id}>
										<Controller
											control={control}
											name={`pictures.${index}.url`}
											defaultValue=''
											render={({
												field: {
													value,
													onChange // value - текущее состояние
												},
												fieldState: {
													error
												}
											}) => (
												<UploadField
													onChange={
														onChange
													}
													value={value}
													error={error}
													placeholder='photo'
												/>
											)}
											rules={{
												required: true
											}}
										/>

										<button
											onClick={() =>
												remove(index)
											}
										>
											Delete
										</button>
									</div>
								))}
								<button
									onClick={() => append({ url: '' })}
								>
									Добавить фотографии
								</button>
							</div>
							<Field
								{...register('name', {
									required: 'name is required'
								})}
								placeholder='name'
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<Field
								{...register('phone_number', {
									required:
										'phone_number is required'
								})}
								placeholder='phone_number'
								error={errors.phone_number}
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
								name='avatar'
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
										placeholder='Avatar'
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
								name='experience'
								render={({
									field,
									fieldState: { error }
								}) => (
									<DynamicSelect
										field={field}
										options={experiences || []}
										isLoading={isExLoading}
										placeholder='Опыт'
										error={error}
										defaultValue={''}
										empty_space={''}
									/>
								)}
								rules={{
									required: 'Опыт is required'
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

						<Button>Update</Button>
					</form>
				)}
			</div>
		</Meta>
	)
}

export default CardEdit
