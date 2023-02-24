import { FC } from 'react'
import { LayoutProps } from './Layout.props'
import styles from './Layout.module.scss'
import Header from './Header/Header'
import Filter from '../screens/filter/Filter'

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className={styles.container}>
			<div className={styles.layout}>
				<Header />
				<div className={styles.filter}>
					<Filter />
					<div className={styles.main}>{children}</div>
					<div>Footer</div>
				</div>
			</div>
		</div>
	)
}

export default Layout
