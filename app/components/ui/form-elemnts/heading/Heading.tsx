import { FC } from 'react'

interface IHeading {
	title: string
	className?: string
}
const Heading: FC<IHeading> = ({ title, className }) => {
	return (
		//   {cn(styles.heading, className)}
		<h1
			className={`text-primary text-opacity-80 font-semibold text-2xl pl-5 pt-5 ${className}`}
		>
			{title}
		</h1>
	)
}
export default Heading
