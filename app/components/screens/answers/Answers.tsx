import { AnswerService } from '@/services/answer.service'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useQuery } from 'react-query'
import parse from 'html-react-parser'
const Answers: FC = () => {
	const { query } = useRouter()
	const orderId = Number(query.id)
	const router = useRouter()
	const { data: answers, isLoading } = useQuery(
		['get answers by Id', orderId],
		() => AnswerService.getById(orderId),
		{
			select: ({ data }) => data
		}
		// { select: ({ data }) => data }
	)

	return isLoading ? (
		<div>Loading</div>
	) : answers?.length ? (
		<>
			{answers.map((answer) => (
				<div>
					<div>{parse(answer.description)}</div>
					<div
						onClick={() =>
							answer.user?.cards
								? router.push(
										`/card/${answer.user?.cards[0].id}`
								  )
								: router.push('/')
						}
					>
						{answer.user?.name}
					</div>
				</div>
			))}
		</>
	) : (
		<div>Нет ответов</div>
	)
}

export default Answers
