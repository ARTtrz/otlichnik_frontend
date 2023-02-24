import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'

import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'

import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useUsers } from './useUser'

const UserList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } =
		useUsers()

	return (
		<Meta title='Users'>
			<AdminNavigation />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Email', 'Date register']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default UserList
