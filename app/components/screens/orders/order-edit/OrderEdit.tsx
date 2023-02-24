import { IOrderUpdate } from '@/services/order.service'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useOrderEdit } from './useOrderEdit'
import styles from './OrderEdit.module.scss'
import Button from '@/components/ui/form-elemnts/Button'
import Field from '@/components/ui/form-elemnts/Field'
import { stripHtml } from 'string-strip-html'

const OrderEdit: FC = () => {
	const DynamicTextEditor = dynamic(
		() => import('@/components/ui/form-elemnts/TextEditor'),
		{
			ssr: false
		}
	)

	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm<IOrderUpdate>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit } = useOrderEdit(setValue)

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					{...register('title', {
						required: 'Title is required'
					})}
					placeholder='Title'
					error={errors.title}
					style={{ width: '31%' }}
				/>
				<div>
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
								placeholder='Work Time'
							/>
						)}
						rules={{
							validate: {
								required: (v) =>
									(v &&
										stripHtml(v).result.length >
											0) ||
									'Description is required'
							}
						}}
					/>
				</div>
				<Button>Отправить</Button>
			</form>
		</div>
	)
}

export default OrderEdit
