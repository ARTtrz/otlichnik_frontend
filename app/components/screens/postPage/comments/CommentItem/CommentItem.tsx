import { IComment } from '@/shared/types/comment.types'
import { FC } from 'react'

import styles from './CommentItem.module.scss'

const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {
	return (
		<div className={styles.commentItem}>
			<p className={styles.user}> {comment.user.name}</p>
			<p className={styles.text}>{comment.text}</p>
		</div>
	)
}

export default CommentItem
