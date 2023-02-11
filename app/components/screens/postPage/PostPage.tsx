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

export interface IPostPage {
	post: ICard
}
const PostPageItem: FC<IPostPage> = (data) => {
	const { mutate } = useMutation('update views', () =>
		CardService.updateViews(data.post.id)
	)

	const [stateId, setStateId] = useState(2)

	useEffect(() => {
		mutate()
	}, [])

	return (
		<Meta title={data.post.title}>
			<div className={styles.post}>
				<div className={styles.wrapper}>
					<div className={styles.header}>
						<Header />
					</div>
					<div className={styles.main}>
						<Image
							src={
								data.post.thumbnail
									? data.post.thumbnail
									: NoPhoto
							}
							alt='Photo'
							width={360}
							height={300}
						/>
						<div>
							{data.post.images &&
								data.post.images.map((link) => (
									<Image
										src={link}
										width={200}
										height={200}
										alt='photo'
									/>
								))}
						</div>
						<div className={styles.data}>
							<div className={styles.title}>
								<p className={styles.name}>
									Название:{' '}
								</p>
								<p>{data.post.title}</p>
							</div>
							<div className={styles.address}>
								<p className={styles.name}>Адресс: </p>
								<p>{data.post.address}</p>
							</div>
							<div className={styles.middle_price}>
								<p className={styles.name}>
									Средняя цена:{' '}
								</p>
								<p>{data.post.middle_price}</p>
							</div>
						</div>
					</div>
					<PageFilter setState={setStateId} />

					<div className={styles.description}></div>
					{stateId == 0 && (
						<div className={styles.descr}>
							{parse(data.post.description)}
						</div>
					)}

					{stateId == 1 && (
						<div className={styles.work}>
							{parse(data.post?.work_time)}
						</div>
					)}
					{stateId == 2 && (
						<div className={styles.reviews}>
							<Comments postId={data.post.id} />
						</div>
					)}
					<FavoriteButton cardId={data.post.id} />

					{/* <div>
						<Comments postId={data.post.id} />
					</div> */}
				</div>
			</div>
		</Meta>
	)
}

export default PostPageItem
