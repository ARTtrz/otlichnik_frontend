import Button from '@/components/ui/form-elemnts/Button'
import { UseActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import Link from 'next/link'
import { FC, MouseEvent } from 'react'
import { IUser } from './user.interface'
import styles from './User.module.scss'
import { toastr } from 'react-redux-toastr'
import Menu from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import Item from 'antd/es/list/Item'
import { useRouter } from 'next/router'
import MaterialIcon from '@/components/ui/MaterialIcon'

const User: FC<IUser> = ({ user_name }) => {
	const { user } = useTypedSelector((state) => state.user)
	const { logout } = UseActions()
	const handleLogOut = (e: MouseEvent<HTMLAnchorElement>) => {
		alert('yess')
		e.preventDefault()
		logout()
	}
	const router = useRouter()
	console.log(user)
	return (
		<>
			{user ? (
				<div className={styles.user}>
					{/* <div className={styles.name}>
						{user.name ? user.name : 'User'}
					</div>

					<a onClick={handleLogOut}>Logout</a> */}
					<ul className={styles.menu}>
						<li>
							<div className={styles.profile}>
								<MaterialIcon name='MdAccountCircle' />
								<div>
									{user.name ? user.name : 'User'}
								</div>
							</div>
							<ul className={styles.extra}>
								<a
									onClick={() =>
										router.push('/profile')
									}
								>
									Profile
								</a>
								<a
									onClick={() =>
										router.push('/my-orders')
									}
								>
									Мои заказы
								</a>
								<a onClick={handleLogOut}>Logout</a>
							</ul>
						</li>
					</ul>
				</div>
			) : (
				<>
					<div>
						<Link href='/login'>Login</Link>
						<Link href='/register'>Register</Link>
					</div>
				</>
			)}
		</>
	)
}

export default User
