export interface IFilter {
	city: string
	category: string
	from: string | undefined | string[]
	to: string | undefined | string[]
	format: string
}
