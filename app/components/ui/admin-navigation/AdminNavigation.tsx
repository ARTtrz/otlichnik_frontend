import { FC } from 'react'
import { NavItems } from './admin-navigation.data'
import styles from './AdminNavigation.module.scss'
import AdminNavItem from './AdminNavItem'

const AdminNavigation: FC = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{NavItems.map((item) => (
					<AdminNavItem key={item.link} item={item} />
				))}
			</ul>
		</nav>
	)
}

export default AdminNavigation
