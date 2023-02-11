import { FC, forwardRef } from 'react'
import { IField } from './form.interface'
import cn from 'classnames'

import styles from './form.module.scss'

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={cn(styles.common, styles.field)} style={style}>
				<label>
					<span>{placeholder}</span>
					<input multiple type={type} ref={ref} {...rest} />
				</label>
				{error && (
					<div className={styles.error}>{error.message}</div>
				)}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field

/**ref={ref}, потому что forwardRef нужно показать куда ему идти */
