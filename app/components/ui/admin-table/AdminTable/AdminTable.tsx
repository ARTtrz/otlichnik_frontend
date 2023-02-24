import { FC } from 'react'
import SkeletonLoader from '../../SkeletonLoader'
import { ITableItem } from './admin-table.interface'

import styles from './AdminTable.module.scss'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'

interface IAdminTable {
	tableItems: ITableItem[]
	isLoading: boolean
	headerItems: string[]
	removeHandler: (id: string | number) => void
}
const AdminTable: FC<IAdminTable> = ({
	tableItems,
	isLoading,
	headerItems,
	removeHandler
}) => {
	console.log(tableItems)
	return (
		<div>
			<AdminTableHeader headerItems={headerItems} />
			{isLoading ? (
				<SkeletonLoader count={1} height={48} className='mt-4' />
			) : tableItems.length ? (
				tableItems.map((tableItem) => (
					<AdminTableItem
						key={tableItem.id}
						removeHandler={() => removeHandler(tableItem.id)}
						tableItem={tableItem}
					/>
				))
			) : (
				<div className={styles.notFound}>Element not found</div>
			)}
		</div>
	)
}

export default AdminTable
