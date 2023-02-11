import Field from '@/components/ui/form-elemnts/Field'
import Input from '@/components/ui/Input/Input'
import { useAuth } from '@/hooks/useAuth'
import { CommentService } from '@/services/comment.service'
import { IComment, ICommentDto } from '@/shared/types/comment.types'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

const AddCommentForm: FC<{ postId: number; refetch: any }> = ({
	postId,
	refetch
}) => {
	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		reset
	} = useForm<ICommentDto>({ mode: 'onChange' })

	const { user } = useAuth()
	const { mutateAsync } = useMutation(
		'add comment',
		(data: ICommentDto) => CommentService.createComment(data),
		{
			onSuccess(data) {
				reset()
				refetch()
			}
		}
	)

	const onSubmit: SubmitHandler<ICommentDto> = async (data) => {
		console.log(data)
		const text = data.text
		await mutateAsync({ text, user, post: postId })
	}

	const [focused, setIsFocused] = useState(false)

	const changeFocused = () => {
		const inputEl = document.getElementById('input')
		const cancelClick = (e: KeyboardEvent) => {
			if (e.key == ' ') e.stopPropagation()
			else if (e.key == 'f') e.stopPropagation()
		}
		inputEl?.addEventListener('keydown', cancelClick)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={'relative'}>
				<Input
					{...register('text', {
						required: 'text is required!'
					})}
					placeholder='Add a public comment'
					error={errors.text}
					onChange={changeFocused}
					onFocus={changeFocused}
					id='input'
				/>
				<button className={'text-2xl absolute -right-2 top-5 '}>
					send
				</button>
			</div>
		</form>
	)
}

export default AddCommentForm
