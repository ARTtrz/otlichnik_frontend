import { AuthService } from '@/services/auth/auth.service'
import { FC } from 'react'
import { useQuery } from 'react-query'
import styles from './ProfileHeader.module.scss'

const ProfileHeader: FC = () => {
	const { data: user, isLoading } = useQuery(
		'current user',
		() => AuthService.getCurrentUser(),
		{ select: ({ data }) => data }
	)
	return <div className={styles.wrapper}>{user ? user.name : 'User'}</div>
}

export default ProfileHeader
