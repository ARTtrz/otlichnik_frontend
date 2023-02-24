import useModal from 'antd/es/modal/useModal'
import dynamic from 'next/dynamic'
import { Dispatch, FC, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'
import Button from '../form-elemnts/Button'
import Field from '../form-elemnts/Field'
import { IModal, IModelCreate } from './modal.interface'
import styles from './Modal.module.scss'
import { useAnswer } from './useModal'

interface Modal {
	isActive: boolean
	setActive: Dispatch<SetStateAction<boolean>>
	orderId: number
}
const DynamicTextEditor = dynamic(
	() => import('@/components/ui/form-elemnts/TextEditor'),
	{
		ssr: false
	}
)

const Modal: FC<Modal> = ({ isActive, setActive, orderId }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm<IModelCreate>({
		mode: 'onChange'
	})
	const { onSubmit } = useAnswer(orderId)
	return (
		<div
			className={isActive ? styles.modal_active : styles.modal}
			onClick={() => setActive(false)}
		>
			<div
				className={styles.modal_content}
				onClick={(e) => e.stopPropagation()}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						{...register('price', {
							required: 'price is required'
						})}
						placeholder='price'
						error={errors.price}
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
		</div>
	)
}

export default Modal
