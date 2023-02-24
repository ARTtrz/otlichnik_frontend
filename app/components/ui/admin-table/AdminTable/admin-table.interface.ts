export interface ITableItem {
	id: number | string
	editUrl: string
	items: string[]
}
export interface IAdminTableItem {
	tableItem: ITableItem
	removeHandler: () => void
}
