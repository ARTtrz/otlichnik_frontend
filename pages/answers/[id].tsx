import Layout from '@/components/layout/Layout'
import Answers from '@/components/screens/answers/Answers'
import Cards from '@/components/screens/cards/Cards'
import Orders from '@/components/screens/orders/Orders'
import Meta from '@/utils/meta/Meta'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const AnswersPage: NextPage = () => {
	return (
		<Meta title='Ответы'>
			<Answers />
		</Meta>
	)
}

export default AnswersPage
