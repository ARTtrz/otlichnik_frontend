import { FC } from 'react'
import { useQuery } from 'react-query'
import cn from 'classnames'

import styles from '../Admin.module.scss'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Link from 'next/link'

import Image from 'next/image'
import { CardService } from '@/services/card.service'
import { ICard } from '@/shared/types/card.types'

const PopularCard: FC = () => {
	const { isLoading, data: favCard } = useQuery(
		'Popular movies in sidebar',
		() => CardService.getMostPopular(),
		{
			select: (data): ICard => data.data[0]
		}
	)
	return (
		<div className={cn(styles.block, styles.popular)}>
			{isLoading ? (
				<SkeletonLoader className='h-48' />
			) : (
				favCard && (
					<>
						<h3> {favCard.views} просмотров</h3>
						<Link href={`card/${favCard.id}`}>
							<Image
								width={285}
								src={favCard.avatar}
								height={176}
								alt={favCard.name}
								className={styles.image}
								unoptimized
							/>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularCard
