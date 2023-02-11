import { FC } from 'react'
import ReducToastrLib from 'react-redux-toastr'

const ReduxToast: FC = () => {
	return (
		<ReducToastrLib
			newestOnTop={false}
			preventDuplicates
			progressBar
			closeOnToastrClick
			timeOut={4000}
			transitionIn='fadeIn'
			transitionOut='fadeOut'
		/>
	)
}
export default ReduxToast
