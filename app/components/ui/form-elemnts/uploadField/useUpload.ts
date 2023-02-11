import { FileService } from '@/services/file.service'
import { toastError } from '@/utils/toast-error'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'

type TypeUpload = (onChange: (...event: any[]) => void) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange) => {
	const [isLoading, setIsLoading] = useState(false)
	const { mutateAsync } = useMutation(
		'upload file',
		(data: FormData) => FileService.upload(data),
		{
			onSuccess({ data }) {
				onChange(data)
				console.log(data)
			},
			onError(error) {
				toastError(error, 'Upload image')
			}
		}
	)

	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const files = e.target.files
			if (files?.length) {
				const formData = new FormData()
				formData.append('file', files[0])
				console.log(files[0])
				await mutateAsync(formData)

				setTimeout(() => {
					setIsLoading(false)
				}, 1000)
			}
		},
		[mutateAsync]
	)

	return useMemo(
		() => ({
			uploadFile,
			isLoading
		}),
		[uploadFile, isLoading]
	)
}
