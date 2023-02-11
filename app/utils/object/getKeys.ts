import { ObjectKeys } from 'react-hook-form/dist/types/path/common'

export const getKeys = <T>(obj: T extends Object ? any : any) =>
	Object.keys(obj) as Array<keyof T>
