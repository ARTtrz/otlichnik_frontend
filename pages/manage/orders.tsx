import OrdersList from '@/components/screens/admin/orders/OrdersList'
import UserList from '@/components/screens/admin/users/UserList'
import { NextPageAuth } from '@/shared/types/auth.types'

const OrderListPage: NextPageAuth = () => {
	return <OrdersList />
}

OrderListPage.isOnlyAdmin = false

export default OrderListPage
