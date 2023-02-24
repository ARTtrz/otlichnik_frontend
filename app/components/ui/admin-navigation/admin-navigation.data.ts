import { getAdminHomeUrl, getAdminUrl } from '@/config/url.config'
import { INavItem } from './admin-navigaton.data.interface'

export const NavItems: INavItem[] = [
	{
		title: 'Статистика',
		link: getAdminHomeUrl()
	},
	{
		title: 'Пользователи',
		link: getAdminUrl('users')
	},
	{
		title: 'Объявления',
		link: getAdminUrl('cards')
	},
	{
		title: 'Заказы',
		link: getAdminUrl('orders')
	}
]
