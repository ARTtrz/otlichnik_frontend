import { useAuth } from '@/hooks/useAuth'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import CardItem from '../cards/CardItem/CardItem'
import FavoriteButton from './FavoriteButton/FavoriteButton'
import { useFavorites } from './useFavorites'

const Favorites: FC = () => {
	const { user } = useAuth()
	const { favoriteCards, isLoading, refetch } = useFavorites(
		user ? user.id : 16
	)
	console.log(user?.id)
	console.log(favoriteCards)
	if (!user) return <div>register pls</div>

	return (
		<Meta title='favorite cards'>
			{favoriteCards?.map((card) => (
				<>
					<CardItem
						id={card.id}
						key={card.id}
						city={card.city?.name}
						address={card.address}
						middle_price={card.middle_price}
						views={card.views}
						rating={card.rating}
						description={card.description}
						title={card.title}
						thumbnail={card.thumbnail}
					/>
				</>
			))}
		</Meta>
	)
}

export default Favorites
