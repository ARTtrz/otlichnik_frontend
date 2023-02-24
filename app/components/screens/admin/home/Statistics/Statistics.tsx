import { FC } from 'react'
import styles from '../Admin.module.scss'
import CountUsers from './CountUsers'
import PopularCard from './PopularCard'

const Statistics: FC = () => {
	return (
		<div className={styles.statistics}>
			<CountUsers />
			<PopularCard />
		</div>
	)
}

export default Statistics
