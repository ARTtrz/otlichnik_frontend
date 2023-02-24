import Meta from '@/utils/meta/Meta'
import Link from 'next/link'
import { FC } from 'react'
import Orders from '../orders/Orders'
import { IHome } from './home.interface'
import styles from './Home.module.scss'

const Home: FC<IHome> = () => {
	return (
		<Meta title='Home'>
			<div className={styles.wrapper}>
				<Orders />
			</div>
		</Meta>
	)
}

export default Home
