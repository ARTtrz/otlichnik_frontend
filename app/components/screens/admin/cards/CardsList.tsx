import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'

import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useCards } from '../../cards/useCards'
import { useCardsList } from './useCards'

const CardsList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } =
		useCardsList()

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
				headerItems={['Name', 'Number', 'Rating']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default CardsList
