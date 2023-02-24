import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import AddCommentForm from './AddCommentForm/AddCommentForm'
import CommentItem from './CommentItem/CommentItem'
import styles from './Comments.module.scss'
import { CommentService } from '@/services/comment.service'

const Comments: FC<{ postId: string }> = ({ postId }) => {
	const { user } = useAuth()

	const { refetch, data, isLoading } = useQuery(
		['get comments', postId],
		() => CommentService.getCommentById(postId),
		{
			select: ({ data }) => data
		}
	)

	return (
		<>
			{' '}
			<div>
				{user && (
					<AddCommentForm postId={postId} refetch={refetch} />
				)}
			</div>{' '}
			{isLoading ? (
				<SkeletonLoader count={4} />
			) : data?.length ? (
				<>
					<div className={styles.grid}>
						{data.map((comment) => (
							<CommentItem
								key={comment.id}
								comment={comment}
							/>
						))}
					</div>
				</>
			) : (
				<p>Comments not found!</p>
			)}
			<h2></h2>
		</>
	)
}

export default Comments
