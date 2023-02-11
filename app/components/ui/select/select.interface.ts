import { Options } from 'react-select'
import { ControllerRenderProps } from 'react-hook-form'
import { IFieldProps } from '../form-elemnts/form.interface'

export interface IOption {
	value: number | string
	label: string | number
}

export interface ISelect extends IFieldProps {
	defaultValue: string
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
	empty_space: string
}
