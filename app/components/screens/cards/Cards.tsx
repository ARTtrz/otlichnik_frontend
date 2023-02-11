import Button from '@/components/ui/form-elemnts/Button'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import CardItem from './CardItem/CardItem'

const Cards = () => {
	const { cards, isLoading } = useTypedSelector((state) => state.card)

	return cards ? (
		<>
			{cards.map((card) => (
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
			))}
		</>
	) : (
		<Button>AAA</Button>
	)
}

export default Cards
