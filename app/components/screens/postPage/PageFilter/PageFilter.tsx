import MaterialIcon from '@/components/ui/MaterialIcon'
import { FC, useEffect } from 'react'
import styles from './PageFilter.module.scss'
interface IPageFilter {
	setState: (num: number) => void
}
const PageFilter: FC<IPageFilter> = ({ setState }) => {
	useEffect(() => {
		setState(0)
	}, [])

	return (
		<div className={styles.filter_container}>
			<button onClick={() => setState(0)}>
				<span>Описание</span>
				<MaterialIcon name='MdDescription' />
			</button>

			<button onClick={() => setState(2)}>
				<span>Отзывы</span>
				<MaterialIcon name='MdTextsms' />
			</button>
		</div>
	)
}

export default PageFilter
