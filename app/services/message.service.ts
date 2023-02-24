import { IMessageFields } from '@/shared/types/message.types'
import axios from 'api/interceptors'

export const MessageService = {
	async create(body: IMessageFields) {
		return axios.post(`/message`)
	},

	async delete(messageId: number, conversationId: number) {
		return axios.delete(`/message/${messageId}`, {
			params: {
				conversationId
			}
		})
	}
}
