import { useAuth } from '@/hooks/useAuth'
import { OrderService } from '@/services/order.service'
import { toastError } from '@/utils/toast-error'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { IOrderCreate } from './createOrder.interface'

export const useCreateOrder = () => {
	const { user } = useAuth()
	const { push } = useRouter()
	const { mutateAsync: createAsync } = useMutation(
		'create card',
		(data: IOrderCreate) => OrderService.create(data),
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
	const onSubmit: SubmitHandler<IOrderCreate> = async (data) => {
		data.user = user
		await createAsync(data)
	}

	return { onSubmit }
}
