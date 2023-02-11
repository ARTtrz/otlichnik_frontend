import { getContentType } from 'api/api.helpers'

import Cookies from 'js-cookie'

import { API_URL, getAuthUrl, getUsersUrl } from '@/config/api.config'

import { IAuthResponse } from '@/store/user/user.interface'

import { removeTokenStorage, saveToStorage } from './auth.helper'
import axios, { axiosClassic } from 'api/interceptors'
import { IUser } from '@/shared/types/user.types'

export const AuthService = {
	async register(email: string, password: string, name: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('/register')}`,
			{
				email,
				password,
				name
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	},
	async login(email: string, password: string) {
		const response = await axios.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('/login')}`,
			{
				email,
				password
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
			console.log(response.data)
		}

		return response
	},
	logout() {
		removeTokenStorage()
		localStorage.removeItem('user')
	},
	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')

		const response = await axios.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('/login/access-token/')}`,
			{
				refreshToken
			},
			{
				headers: getContentType()
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	},
	async getCurrentUser() {
		return axios.get<IUser>(getUsersUrl('/get'))
	}
}
