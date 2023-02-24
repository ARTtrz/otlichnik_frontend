import MaterialIcon from '@/components/ui/MaterialIcon'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { NextResponse, NextRequest } from 'next/server'
import styles from './AdminActions.module.scss'

interface IAdminActions {
	editUrl: string
	removeHandler: () => void
}
const AdminActions: FC<IAdminActions> = ({ editUrl, removeHandler }) => {
	const router = useRouter()
	return (
		<div className={styles.actions}>
			<button onClick={() => router.push(editUrl)}>
				<MaterialIcon name='MdEdit' />
			</button>
			<button onClick={removeHandler}>
				<MaterialIcon name='MdClose' />
			</button>
		</div>
	)
}

export default AdminActions
