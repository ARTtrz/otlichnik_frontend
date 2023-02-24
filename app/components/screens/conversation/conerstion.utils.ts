import { IMessage } from '@/shared/types/message.types'

export const isCurrentUserMessage = (item: IMessage, currentUserId?: number) =>
	currentUserId === item.userFrom.id
