import { DeleteOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button, Card, Input, List } from 'antd'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC, KeyboardEvent, useState } from 'react'

import Layout from '@/components/layout/Layout'
import { isCurrentUserMessage } from './conerstion.utils'
import { useChat } from '@/components/screens/conversation/useChat'

import { IUser } from '@/shared/types/user.types'

import { useAuth } from '@/hooks/useAuth'

import styles from './Conversation.module.scss'
import Meta from '@/utils/meta/Meta'
import UserInfo from '@/components/ui/posts/post-item/UserInfo'
import { useProfileById } from '@/hooks/useProfileById'

const Conversation: FC = () => {
	const { query } = useRouter()

	const { data: userTo } = useProfileById(Number(query.with))

	const conversationId = query?.id

	const { conversation, sendMessage, removeMessage, isConnected } =
		useChat(conversationId)

	/*const { isLoading, data: userTo } = useProfileById(query.with);
	const { data, isLoading: isLoadingConversation } = useQuery(
		['get conversation'],
		() => ConversationService.get(String(conversationId)),
		{
			select: ({ data }) => data,
			enabled: !!conversationId
		}
	);*/

	const { user } = useAuth()

	const [message, setMessage] = useState('')

	const addMessageHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendMessage({
				conversationId: conversation.id,
				text: message,
				userFromId: user?.id,
				userToId: userTo?.id
			})
			setMessage('')
		}
	}
	const removeMessageHandler = async (messageId: number) => {
		removeMessage({ conversationId: Number(conversationId), messageId })
	}

	return (
		<Meta title='Диалог'>
			<div style={{ marginTop: '1rem' }}>
				<Card
					bodyStyle={{
						paddingBottom: 10
					}}
					style={{
						backgroundColor: '#eaf4ff'
					}}
				>
					<UserInfo user={userTo || ({} as IUser)} />
				</Card>
				{isConnected ? (
					<Alert type={'success'} message={'Connected'} />
				) : (
					<Alert type={'error'} message={'not connected'} />
				)}
				<Card
					id={'scrollableDiv'}
					style={{
						maxHeight: 400,
						overflow: 'auto',
						margin: '1rem 0'
					}}
				>
					{/*{isLoadingConversation ? (*/}
					{/*	<Skeleton />*/}
					{/*) : (*/}
					<List
						dataSource={conversation.messages || []}
						renderItem={(item) => (
							<List.Item
								key={item.id}
								className={styles.item}
								style={
									isCurrentUserMessage(
										item,
										user?.id
									)
										? {
												justifyContent:
													'flex-end'
										  }
										: {}
								}
							>
								<List.Item.Meta
									avatar={
										<Avatar
											src={
												item.userFrom.avatar
											}
										/>
									}
									title={item.userFrom.name}
									description={item.text}
									className={cn(styles.message, {
										[styles.current]:
											isCurrentUserMessage(
												item,
												user?.id
											)
									})}
								/>
								{isCurrentUserMessage(
									item,
									user?.id
								) && (
									<Button
										type='text'
										style={{
											position: 'absolute',
											top: 15,
											right: '7%',
											opacity: 0.5
										}}
										title='Удалить сообщение'
										onClick={() =>
											removeMessageHandler(
												item.id
											)
										}
									>
										<DeleteOutlined
											style={{
												color: '#F8466E'
											}}
										/>
									</Button>
								)}
							</List.Item>
						)}
					/>
					{/*)}*/}
				</Card>
				<Input
					placeholder={'Send message'}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={addMessageHandler}
				/>
			</div>
		</Meta>
	)
}

export default Conversation
