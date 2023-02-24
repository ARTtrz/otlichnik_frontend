import Heading from '@/components/ui/form-elemnts/heading/Heading'
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
			<Heading title='Понравившиеся объявления' />
			{favoriteCards ? (
				favoriteCards?.map((card) => (
					<>
						<CardItem
							phone={card.phone_number}
							id={card.id}
							key={card.id}
							city={card.city?.name}
							middle_price={card.middle_price}
							views={card.views}
							rate={card.rate}
							rating={card.rate}
							description={card.description}
							name={card.name}
							avatar={card.avatar}
						/>
					</>
				))
			) : (
				<div>Нет лайканных</div>
			)}
		</Meta>
	)
}

export default Favorites
