import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'

import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useCards } from '../../cards/useCards'
import { useOrdersList } from './useOrders'

const OrdersList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } =
		useOrdersList()

	return (
		<Meta title='Movies'>
			<AdminNavigation />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Title', 'Description']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default OrdersList
