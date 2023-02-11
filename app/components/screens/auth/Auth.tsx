import { useAuth } from '@/hooks/useAuth'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'
import styles from './Auth.module.scss'
import Meta from '@/utils/meta/Meta'
import Button from '@/components/ui/form-elemnts/Button'
import { UseActions } from '@/hooks/useActions'
import Heading from '@/components/ui/form-elemnts/heading/Heading'
import AuthFields from './AuthFields'
const Auth: FC = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()

	const [type, setType] = useState<'login' | 'register'>('login')
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset
	} = useForm<IAuthInput>({
		mode: 'onChange'
	})

	const { login, register } = UseActions()

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		console.log(data)
		register(data)

		reset()
	}
	return (
		<Meta title='Auth'>
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading
						title='Вход в систему'
						className='mb-6 text-lg'
					/>
					<AuthFields
						formState={formState}
						register={registerInput}
						isPasswordRequired
					/>
					{/**fields */}
					<div className={styles.buttons}>
						{/* <Button
							type='submit'
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Login
						</Button> */}
						<Button
							type='submit'
							onClick={() => setType('register')}
							disabled={isLoading}
						>
							Register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default Auth
