import AiMaterialIcon from '@/components/ui/AiMaterialIcon'
import MaterialIcon from '@/components/ui/MaterialIcon'
import Link from 'next/link'
import { FC } from 'react'
import CreateButton from './CreateButton/CreateButton'
import FavoriteButtonHeader from './CreateButton/FavoriteButton'
import FreelanceButton from './CreateButton/FreelanceButton'
import styles from './Header.module.scss'
import User from './User/User'

const Header: FC = () => {
	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<Link href='/'>amri.kz</Link>
			</div>
			<div>
				<FreelanceButton />
			</div>
			<div className={styles.second_part}>
				<CreateButton />
				<FavoriteButtonHeader />
				<User user_name='Artem' />
			</div>
		</div>
	)
}

export default Header
