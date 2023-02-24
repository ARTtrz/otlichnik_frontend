import Button from '@/components/ui/form-elemnts/Button'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import CardItem from './CardItem/CardItem'

const Cards = () => {
	const { cards, isLoading } = useTypedSelector((state) => state.card)

	return cards ? (
		<>
			{cards.map((card) => (
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
			))}
		</>
	) : (
		<Button>AAA</Button>
	)
}

export default Cards
