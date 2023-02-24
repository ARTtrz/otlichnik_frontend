import Image from 'next/image'
import { FC } from 'react'
import { ICardItem } from './cardItem.interface'
import styles from './CardItem.module.scss'
import NoPhoto from './nophoto.jpg'
import parse from 'html-react-parser'
import { useRouter } from 'next/router'
import FavoriteButton from '../../favorites/FavoriteButton/FavoriteButton'
import MaterialIcon from '@/components/ui/MaterialIcon'

const CardItem: FC<ICardItem> = (data) => {
	const router = useRouter()

	return (
		<div className={styles.wrapper}>
			<Image
				//src='https://otlichnik-kz.s3.us-east-1.amazonaws.com/1672757987443%2
				src={
					data.avatar
						? data.avatar
						: 'https://otlichnik-kz.s3.amazonaws.com/1674298598884%20-%20toples.jpg'
				}
				alt='no photo'
				width={150}
				onClick={() => router.push(`/card/${data.id}`)}
				height={150}
			/>

			<div className={styles.data}>
				<h1 className={styles.title}>{data.name}</h1>
				<div className={styles.description}>
					{parse(data.description)}
				</div>
				<div className={styles.phone}>
					<MaterialIcon name='MdPhone' />
					<div>{data.phone}</div>
				</div>
			</div>
			<div className={styles.details}>
				<div className={styles.price}>{data.middle_price}</div>
				<div className={styles.rating}>
					<span>{data.rate}</span>
					<MaterialIcon name='MdStarRate' />
				</div>
				<div className={styles.views}>{data.views}</div>
			</div>

			{router.asPath == '/profile' && (
				<button
					className={styles.edit}
					onClick={() => router.push(`/post/edit/${data.id}`)}
				>
					Edit
				</button>
			)}
		</div>
	)
}

export default CardItem
