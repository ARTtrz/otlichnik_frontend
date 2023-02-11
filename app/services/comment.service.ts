import { IComment, ICommentDto } from '@/shared/types/comment.types'
import { axiosClassic } from 'api/interceptors'
import axios from '../api/interceptors'

export const CommentService = {
	async getCommentById(postId: number) {
		return axiosClassic.get<IComment[]>(`/comment/${postId}`)
	},

	async createComment(body: ICommentDto) {
		return axios.post<IComment>('/comment/create', body)
	}
}
