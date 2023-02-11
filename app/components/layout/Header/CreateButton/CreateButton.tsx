import { useRouter } from 'next/router'
import { FC } from 'react'
import styles from './CreateButton.module.scss'
const CreateButton: FC = () => {
	const router = useRouter()
	return (
		<button
			className={styles.button}
			onClick={() => router.push('/create')}
		>
			Подать объявление
		</button>
	)
}

export default CreateButton
