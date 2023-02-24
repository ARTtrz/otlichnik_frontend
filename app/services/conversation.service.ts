import { IConversation } from '@/shared/types/message.types'
import axios, { axiosClassic } from '../api/interceptors'

export const ConversationService = {
	async get(conversationId: string) {
		return axios.get<IConversation>(`/conversation/${conversationId}`)
	},

	async create(withUserId: number) {
		return axios.post<IConversation>(`/conversation`, { withUserId })
	}
}
