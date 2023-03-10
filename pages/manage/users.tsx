import UserList from '@/components/screens/admin/users/UserList'
import { NextPageAuth } from '@/shared/types/auth.types'

const UserListPage: NextPageAuth = () => {
	return <UserList />
}

UserListPage.isOnlyAdmin = false

export default UserListPage
