import { ICard } from '@/shared/types/card.types'
import { FC, useEffect, useState } from 'react'
import parse from 'html-react-parser'
import styles from './PostPageItem.module.scss'
import Image from 'next/image'
import NoPhoto from '../cards/CardItem/nophoto.jpg'
import Header from '@/components/layout/Header/Header'
import Comments from './comments/Comments'
import Meta from '@/utils/meta/Meta'
import { useMutation } from 'react-query'
import { CardService } from '@/services/card.service'
import FavoriteButton from '../favorites/FavoriteButton/FavoriteButton'
import MaterialIcon from '@/components/ui/MaterialIcon'
import cn from 'classnames'
import PageFilter from './PageFilter/PageFilter'
import Button from '@/components/ui/form-elemnts/Button'
import { useRouter } from 'next/router'
import { ConversationService } from '@/services/conversation.service'
import { useAuth } from '@/hooks/useAuth'
import dynamic from 'next/dynamic'
import CategoryItem from './CategoryItem/CategoryItem'

export interface IPostPage {
	post: ICard
}
const DynamicRateMovie = dynamic(() => import('./RateCard/RateCard'), {
	ssr: false
})
const PostPageItem: FC<IPostPage> = (card) => {
	const { mutate } = useMutation('update views', () =>
		CardService.updateViews(card.post.id)
	)
	const { push } = useRouter()

	const { mutate: createConversation } = useMutation(
		['create conversation'],
		() => ConversationService.create(card.post.owner.id),

		{
			onSuccess: async ({ data }) => {
				console.log(card.post.owner.id)
				console.log(data)
				await push(
					`/conversation/${data.id}?with=${card.post.owner.id}`
				)
			}
		}
	)
	const { user } = useAuth()
	console.log(card.post.owner?.id)
	const isMyProfile = user?.id === card.post.owner?.id

	const [stateId, setStateId] = useState(2)

	useEffect(() => {
		mutate()
	}, [])

	return (
		<Meta title={card.post.name}>
			<div className={styles.post}>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.wrapper}>
					<div className={styles.main}>
						<Image
							src={
								card.post.avatar
									? card.post.avatar
									: NoPhoto
							}
							alt='Photo'
							width={360}
							height={300}
						/>

						<div className={styles.card}>
							<div className={styles.title}>
								<p className={styles.name}>Имя: </p>
								<p>{card.post.name}</p>
							</div>
							<div className={styles.work}>
								<p className={styles.name}>
									Опыт работы:{' '}
								</p>
								<p>{card.post.experience?.name}</p>
							</div>
							<div className={styles.middle_price}>
								<p className={styles.name}>Возраст: </p>
								<p>{card.post.age}</p>
							</div>
							<div className={styles.phone}>
								<p className={styles.name}>Телефон: </p>
								<p>{card.post.phone_number}</p>
							</div>
							<div className={styles.categories}>
								<p className={styles.name}>
									Категории:{' '}
								</p>
								<div className={styles.edu}>
									{card.post.categories?.map(
										(category) => (
											<CategoryItem
												name={category.name}
											/>
										)
									)}
								</div>
							</div>
							<Button
								disabled={isMyProfile}
								style={{ width: 200 }}
								onClick={() => createConversation()}
							>
								Send message
							</Button>
						</div>
					</div>
					<FavoriteButton cardId={card.post.id} />
					<PageFilter setState={setStateId} />

					{stateId == 0 && (
						<div>
							<div className={styles.descr}>
								{parse(card.post.description)}
							</div>
							<div>
								{card.post.images &&
									card.post.images.map((link) => (
										<Image
											src={link}
											width={200}
											height={200}
											alt='photo'
										/>
									))}
							</div>
						</div>
					)}

					{stateId == 2 && (
						<div className={styles.reviews}>
							<DynamicRateMovie id={card.post.id} />
							<Comments postId={card.post.id} />
						</div>
					)}

					{/* <div>
						<Comments postId={card.post.id} />
					</div> */}
				</div>
			</div>
		</Meta>
	)
}

export default PostPageItem
