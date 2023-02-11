import Header from '@/components/layout/Header/Header'
import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/auth/auth.service'
import { CardService } from '@/services/card.service'
import Meta from '@/utils/meta/Meta'
import parse from 'html-react-parser'
import { FC } from 'react'
import { useQuery } from 'react-query'
import CardItem from '../cards/CardItem/CardItem'
import styles from './Profile.module.scss'
import ProfileHeader from './ProfileHeader/ProfileHeader'
const Profile: FC = () => {
	const { data: profile, isLoading } = useQuery(
		'current user',
		() => AuthService.getCurrentUser(),
		{ select: ({ data }) => data }
	)

	const { user } = useAuth()

	console.log(profile?.id, user?.id)
	const { data: cards, isLoading: isCardsLoading } = useQuery(
		'current user cards',
		() => CardService.getCardsByUser(user ? user?.id : 19),
		{ select: ({ data }) => data }
	)

	console.log(cards, profile)
	return (
		<Meta title='Profile'>
			<div className={styles.wrapper}>
				{/* <ProfileHeader /> */}
				<div className={styles.header}>
					<Header />
				</div>
				{isLoading ? (
					<div>Loading</div>
				) : (
					<div className={styles.profile}>
						<div className={styles.info}>
							<div>
								<span>Ник</span>
								<p>{profile?.name}</p>
							</div>
							<div>
								<span>Почта</span>
								<p>{profile?.email}</p>
							</div>
							<div>
								<span>Дата регистрации</span>
								<p>{profile?.createdAt}</p>
							</div>
						</div>
						{isCardsLoading ? (
							<p>Loading</p>
						) : (
							<div className={styles.edit}>
								<h1>Мои объявления</h1>
								{cards?.map((card) => (
									<CardItem
										id={card.id}
										key={card.id}
										city={card.city?.name}
										address={card.address}
										middle_price={
											card.middle_price
										}
										views={card.views}
										rating={card.rating}
										description={card.description}
										title={card.title}
										thumbnail={card.thumbnail}
									/>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</Meta>
	)
}

export default Profile
