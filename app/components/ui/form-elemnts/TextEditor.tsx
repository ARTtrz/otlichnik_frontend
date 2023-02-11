import { ContentState, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { FC, useEffect, useState } from 'react'
import { ITextEditor } from './form.interface'
import styles from './form.module.scss'
import cn from 'classnames'
import { Editor } from 'react-draft-wysiwyg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
const TextEditor: FC<ITextEditor> = ({
	onChange,
	value,
	placeholder,
	error
}) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())

	const [isUpdated, setIsUpdated] = useState(false)
	useEffect(() => {
		if (isUpdated) return

		const defaultValue = value || ''
		const blocksFromHtml = htmlToDraft(defaultValue)

		const contentState = ContentState.createFromBlockArray(
			blocksFromHtml.contentBlocks,
			blocksFromHtml.entityMap
		)
		const newEditorState = EditorState.createWithContent(contentState)
		console.log(newEditorState)
		setEditorState(newEditorState)
	}, [isUpdated, value])

	const onEditorStateChange = (editorState: EditorState) => {
		setIsUpdated(true)
		setEditorState(editorState)

		return onChange(
			draftToHtml(convertToRaw(editorState.getCurrentContent()))
		)
	}

	return (
		<div
			className={cn(
				styles.common,
				styles.editorWrapper,
				'animate-fade'
			)}
		>
			<label>
				<span>{placeholder}</span>
				<div className={styles.wrapper}>
					<Editor
						toolbarClassName={styles.toolbar}
						editorClassName={styles.editor}
						editorState={editorState}
						onEditorStateChange={onEditorStateChange}
						spellCheck
						toolbar={{
							options: ['inline', 'blockType', 'list'],
							inline: {
								inDropdown: false,
								className: undefined,
								component: undefined,
								dropDownClassName: undefined,
								options: [
									'bold',
									'italic',
									'underline',
									'strikethrough'
								]
							},
							bockType: {
								inDropdown: false,
								options: []
							},
							list: {
								inDropdown: false,
								options: ['unordered', 'ordered']
							}
						}}
					/>
				</div>

				{error && (
					<div className={styles.error}>{error.message}</div>
				)}
			</label>
		</div>
	)
}

export default TextEditor
