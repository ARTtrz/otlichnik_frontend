import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IInputProps {
	error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IInputProps

export interface IInput extends TypeInputPropsField {}
