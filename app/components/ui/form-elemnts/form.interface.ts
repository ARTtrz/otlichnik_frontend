import { Editor, EditorProps } from 'draft-js'
import { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes } from 'react'
import { CustomElement, Message, MultipleFieldErrors } from 'react-hook-form'
export type FieldValues = Record<string, any>

export type FieldElement<TFieldValues extends FieldValues = FieldValues> =
	| HTMLInputElement
	| HTMLSelectElement
	| HTMLTextAreaElement
	| CustomElement<TFieldValues>

export type Ref = FieldElement

export type FieldError = {
	root?: FieldError
	ref?: Ref
	types?: MultipleFieldErrors
	message?: Message
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsField {}

type TypeEditorPropsField = IFieldProps & EditorProps

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
	onChange: (...event: any[]) => void
	value: string
}

export interface IUploadField {
	folder?: string
	value?: string
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}
