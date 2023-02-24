import { useRenderClient } from '@/hooks/useRenderClient'
import {
	TypeMaterialIconAiName,
	TypeMaterialIconName
} from '@/shared/types/icon.types'
import { FC } from 'react'
import * as MaterialIcons from 'react-icons/ai'

// const MaterialIcon:FC<{name: TypeMaterialIconName}> = ({name}) => {
//   const IconComponent = MaterialIcons[name]

//   return <IconComponent /> || <MaterialIcons.MdDragIndicator/>
// }
export const AiMaterialIcon: FC<{ name: TypeMaterialIconAiName }> = ({
	name
}) => {
	const { isRenderClient } = useRenderClient()

	const IconComponent = MaterialIcons[name]

	if (isRenderClient)
		return <IconComponent /> || <MaterialIcons.AiFillAlert />
	else return null
}

export default AiMaterialIcon
