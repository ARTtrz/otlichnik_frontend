import { CardService } from '@/services/card.service'
import { ICard } from '@/shared/types/card.types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { FC } from 'react'
import parse from 'html-react-parser'
import PostPageItem, { IPostPage } from '@/components/screens/postPage/PostPage'
import Header from '@/components/layout/Header/Header'

const PostPage: NextPage<IPostPage> = ({ post }) => {
	return <>{post ? <PostPageItem post={post} /> : <div>Not Found</div>}</>
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: post } = await CardService.getById(
			params ? String(params.id) : ''
		)

		console.log(post)

		return {
			props: {
				post
			},
			revalidate: 60
		}
	} catch (error) {
		return {
			notFound: true
		}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: posts } = await CardService.getAll()
		const paths = posts.map((c) => ({
			params: { id: String(c.id) }
		}))

		return {
			paths,
			fallback: 'blocking'
		}
	} catch (error) {
		return {
			fallback: false,
			paths: []
		}
	}
}

export default PostPage
