import { IOrderCreate } from '@/components/screens/createOrder/createOrder.interface'
import { useAuth } from '@/hooks/useAuth'
import { AnswerService } from '@/services/answer.service'
import { toastError } from '@/utils/toast-error'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { IModal } from './modal.interface'

export const useAnswer = (orderId: number) => {
	const { user } = useAuth()
	const { push } = useRouter()
	const { mutateAsync: createAsync } = useMutation(
		'create answer',
		(data: IModal) => AnswerService.create(data),
		{
			onError(error) {
				toastError(error, 'Create Card')
			},
			onSuccess() {
				alert('Success')
				toastr.success(
					'Create card',
					'card was created succesfully'
				)
				push('/')
			}
		}
	)
	const onSubmit: SubmitHandler<IModal> = async (data) => {
		data.user = user
		data.order = orderId
		await createAsync(data)
	}

	return { onSubmit }
}
