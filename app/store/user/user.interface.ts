import { IUser } from '@/shared/types/user.types'

export interface IUserState {
	name: string
	email: string
	isAdmin: boolean
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUser | null
	isLoading: boolean
}

export interface IEmailPassword {
	name: string
	email: string
	password: string
}

export interface ILoginEmailPassword {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
