import axios from 'api/interceptors'

export const FileService = {
	async upload(file: FormData) {
		return axios.post<string>('/file', file, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}
}
