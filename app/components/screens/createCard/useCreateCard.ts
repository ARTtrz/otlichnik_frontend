import { useAuth } from '@/hooks/useAuth'
import { CardService } from '@/services/card.service'
import { toastError } from '@/utils/toast-error'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { ICreateCard } from './createCard.interface'

export const useCreateCard = () => {
	const { push } = useRouter()
	const { mutateAsync: createAsync } = useMutation(
		'create card',
		(data: ICreateCard) => CardService.create(data),
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
	const { user } = useAuth()
	const onSubmit: SubmitHandler<ICreateCard> = async (data) => {
		console.log('start')
		alert('started')
		const images_arr: string[] = []
		data.pictures &&
			data.pictures.map((link) => images_arr.push(link.url))

		console.log(data)
		data.owner = user

		data.images = images_arr
		console.log(data)
		await createAsync(data)
	}

	return { onSubmit }
}
