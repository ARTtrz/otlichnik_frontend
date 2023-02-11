import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { IHome } from './home.interface'

const Home: FC<IHome> = () => {
	return (
		<Meta title='Home'>
			<div>Home</div>
		</Meta>
	)
}

export default Home
