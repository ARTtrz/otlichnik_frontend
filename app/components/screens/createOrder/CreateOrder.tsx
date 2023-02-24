import Button from '@/components/ui/form-elemnts/Button'
import Field from '@/components/ui/form-elemnts/Field'
import Meta from '@/utils/meta/Meta'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'
import { IOrderCreate } from './createOrder.interface'
import styles from './CreateOrder.module.scss'
import { useCreateOrder } from './useCreateOrder'
const DynamicTextEditor = dynamic(
	() => import('@/components/ui/form-elemnts/TextEditor'),
	{
		ssr: false
	}
)

const CreateOrder: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm<IOrderCreate>({
		mode: 'onChange'
	})

	const { onSubmit } = useCreateOrder()
	return (
		<Meta title='Create Order'>
			<div className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						{...register('title', {
							required: 'Заголовок обязателен'
						})}
						placeholder='Заголовок'
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
									placeholder='Описание и особенности заказа'
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
					<Button>Отправить</Button>
				</form>
			</div>
		</Meta>
	)
}

export default CreateOrder
