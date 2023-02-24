import { FC } from 'react'
import styles from './CategoryItem.module.scss'
const CategoryItem: FC<{ name: string }> = ({ name }) => {
	return <div className={styles.cat}>{name}</div>
}

export default CategoryItem
