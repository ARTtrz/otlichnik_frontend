import CardsList from '@/components/screens/admin/cards/CardsList'
import UserList from '@/components/screens/admin/users/UserList'
import { NextPageAuth } from '@/shared/types/auth.types'

const CardsListPage: NextPageAuth = () => {
	return <CardsList />
}

CardsListPage.isOnlyAdmin = false

export default CardsListPage
