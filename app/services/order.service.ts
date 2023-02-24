import { IOrderCreate } from '@/components/screens/createOrder/createOrder.interface'
import { getOrdersUrl } from '@/config/api.config'
import { IMessageFields } from '@/shared/types/message.types'
import { IOrder } from '@/shared/types/order.types'
import axios, { axiosClassic } from 'api/interceptors'

export interface IOrderUpdate {
	title: string
	description: string
}

export const OrderService = {
	async getAllBySearch(searchTerm?: string) {
		return axios.get<IOrder[]>(
			getOrdersUrl(`/get-search?searchTerm=${searchTerm}`),
			{}
		)
	},
	async getById(id: number) {
		return axiosClassic.get<IOrder>(getOrdersUrl(`/${id}`))
	},

	async getAll() {
		return axiosClassic.get<IOrder[]>(getOrdersUrl('/'))
	},
	async create(data: IOrderCreate) {
		return axios.post<IOrder>(getOrdersUrl('/'), data)
	},
	async getByUserId() {
		return axios.get<IOrder[]>(getOrdersUrl('by-user-id'))
	},
	async deleteOrder(_id: string | number | undefined) {
		return axios.delete<string>(getOrdersUrl(`/${_id}`))
	},
	async update(id: number, data: IOrderUpdate) {
		return axios.put<IOrder>(getOrdersUrl(`/${id}`), data)
	}
}
