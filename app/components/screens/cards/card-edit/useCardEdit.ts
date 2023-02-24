// import { getAdminUrl } from '@/config/url.config';
// import { MovieService } from '@/services/movie.service';
// import { getKeys } from '@/utils/object/getKeys';
// import { toastError } from '@/utils/toast-error';
// import { useRouter } from 'next/router';
// import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
// import { useMutation, useQuery } from 'react-query';
// import { toastr } from 'react-redux-toastr';
// import { IMovieEditInterface } from './movie-edit.interface';

// export const useGenreEdit = (setValue: UseFormSetValue<IMovieEditInterface>) => {

// 	const {push, query} = useRouter();

// 	const movieId = String(query.id);

// 	const {isLoading} = useQuery(['movie', movieId], () => MovieService.getById(movieId), {
// 		onSuccess: ({data}) => {

// 			getKeys(data).forEach(key => {
// 				setValue(key, data[key])
// 			})

// 		},

// 		onError:(error) => {
// 			toastError(error, 'Get movie')
// 		},
// 		enabled: !!query.id
// 	})

// 	const {mutateAsync} = useMutation('update movie', (data:IMovieEditInterface) => MovieService.update(movieId, data), {
// 		onError: (error) => {
// 			toastError(error, 'Update movie')
// 		},

// 		onSuccess: () => {
// 			toastr.success('Update movie', 'update was successful')
// 			push(getAdminUrl('genres'))
// 		}

// 	})

// 	const onSubmit:SubmitHandler<IMovieEditInterface> = async (data) => {
// 		await mutateAsync(data)

// 	}

// 	return {onSubmit, isLoading}

// }

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

export const useCardEdit = (setValue: UseFormSetValue<ICreateCardPage>) => {
	const { query, push } = useRouter()

	const cardId = String(query.id)

	const { data: cardForEdit, isLoading } = useQuery(
		['get card by id ok', cardId],
		() => CardService.getById(cardId),
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
		(data: ICreateCard) => CardService.update(cardId, data),
		{
			onSuccess() {
				toastr.success('Update card', 'update was successful')
				push('/')
			}
		}
	)

	const onSubmit: SubmitHandler<ICreateCard> = (data) => {
		console.log(data)
		mutateAsync(data)
		alert('submit')
	}

	return { onSubmit, isLoading }
}
