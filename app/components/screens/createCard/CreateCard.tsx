import Button from '@/components/ui/form-elemnts/Button'
import Field from '@/components/ui/form-elemnts/Field'
import TextEditor from '@/components/ui/form-elemnts/TextEditor'
import UploadField from '@/components/ui/form-elemnts/uploadField/UploadField'
import { useAuth } from '@/hooks/useAuth'
import Meta from '@/utils/meta/Meta'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFieldArray
} from 'react-hook-form'
import { stripHtml } from 'string-strip-html'
import { useCategories } from '../filter/useCategories'
import { useCities } from '../filter/useCities'
import { useCreateCategories } from '../filter/useCreateCategories'
import { useCreateCities } from '../filter/useCreateCities'
import { useCreateFormats } from '../filter/useCreateFormats'
import { ICreateCard } from './createCard.interface'
import styles from './CreateCard.module.scss'
import { useCreateCard } from './useCreateCard'

const DynamicSelect = dynamic(() => import('@/components/ui/select/Select'), {
	ssr: false
})

const DynamicTextEditor = dynamic(
	() => import('@/components/ui/form-elemnts/TextEditor'),
	{
		ssr: false
	}
)

const CreateCard: FC = () => {
	const { user } = useAuth()
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

	const { fields, append, remove } = useFieldArray({
		name: 'pictures',
		control,
		rules: {
			required: 'Please append at least 2 item'
		}
	})

	const { isLoading: isCityLoading, data: cities } = useCreateCities()
	const { isLoading, data: categories } = useCreateCategories()
	const { isLoading: isFormatsLoading, data: formats } = useCreateFormats()
	const { onSubmit } = useCreateCard()

	return (
		<Meta title='Create Card'>
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
										fieldState: { error }
									}) => (
										<UploadField
											onChange={onChange}
											value={value}
											error={error}
											placeholder='photo'
										/>
									)}
									rules={{
										required: true
									}}
								/>

								<button onClick={() => remove(index)}>
									Delete
								</button>
							</div>
						))}
						<button onClick={() => append({ url: '' })}>
							Добавить фотографии
						</button>
					</div>

					<div className={styles.first_data}>
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
								required: 'Middle price is required'
							})}
							placeholder='Middle price'
							error={errors.middle_price}
							style={{ width: '31%' }}
						/>
					</div>
					<div className={styles.second_data}>
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

						<div className={styles.selects}>
							<div className={styles.city}>
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
							</div>

							<div className={styles.category}>
								<Controller
									control={control}
									name='categories'
									render={({
										field,
										fieldState: { error }
									}) => (
										<DynamicSelect
											field={field}
											options={
												categories || []
											}
											isLoading={isLoading}
											placeholder='Categories'
											error={error}
											isMulti
											defaultValue={''}
											empty_space={''}
										/>
									)}
									rules={{
										required:
											'Category is required'
									}}
								/>
							</div>

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
									required: 'City is required'
								}}
							/>
						</div>
					</div>

					<div className={styles.description}>
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
					<div className={styles.worktime}>
						<Controller
							control={control}
							name='work_time'
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<DynamicTextEditor
									onChange={onChange}
									value={value}
									error={error}
									placeholder='Work Time'
								/>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v &&
											stripHtml(v).result
												.length > 0) ||
										'Schedule is required'
								}
							}}
						/>
					</div>
				</div>

				<Button type='submit'>Create</Button>
			</form>
		</Meta>
	)
}

export default CreateCard
