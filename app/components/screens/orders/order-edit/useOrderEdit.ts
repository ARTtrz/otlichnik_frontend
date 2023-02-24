import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { toastError } from '@/utils/toast-error'
import { getKeys } from '@/utils/object/getKeys'

import { getAdminUrl } from '@/config/url.config'
import {
	ICreateCard,
	ICreateCardPage
} from '../../createCard/createCard.interface'
import { CardService } from '@/services/card.service'
import { IOrderUpdate, OrderService } from '@/services/order.service'

export const useOrderEdit = (setValue: UseFormSetValue<IOrderUpdate>) => {
	const { query, push } = useRouter()

	const cardId = Number(query.id)

	const { data: cardForEdit, isLoading } = useQuery(
		['get card by id ok', cardId],
		() => OrderService.getById(cardId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			enabled: !!query.id
		}
		// { select: ({ data }) => data }
	)

	const { mutateAsync } = useMutation(
		['update card', cardId],
		(data: IOrderUpdate) => OrderService.update(cardId, data),
		{
			onSuccess() {
				toastr.success('Update order', 'update was successful')
				push('/')
			}
		}
	)

	const onSubmit: SubmitHandler<IOrderUpdate> = (data) => {
		console.log(data)
		mutateAsync(data)
		alert('submit')
	}

	return { onSubmit, isLoading }
}
