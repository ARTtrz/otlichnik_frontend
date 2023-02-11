import Link from 'next/link'
import { FC } from 'react'
import CreateButton from './CreateButton/CreateButton'
import styles from './Header.module.scss'
import User from './User/User'

const Header: FC = () => {
	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<Link href='/'>Otlichnik.kz</Link>
			</div>
			<div className={styles.second_part}>
				<CreateButton />
				<User user_name='Artem' />
			</div>
		</div>
	)
}

export default Header
