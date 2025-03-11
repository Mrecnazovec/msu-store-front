import { axiosWithAuth } from '../api/api.interceptors'
import { API_URL } from '../config/api.config'
import { IUser, IUserInput, IUserRole } from '../shared/types/user.interface'

class UserService {
	async getProfile() {
		const { data } = await axiosWithAuth<IUser>({
			url: API_URL.users('/profile'),
			method: 'GET',
		})

		return data
	}

	async getAll() {
		const response = await axiosWithAuth<IUser>({
			url: API_URL.users('/all'),
			method: 'GET',
		})

		return response
	}

	async update(data: IUserInput) {
		const response = await axiosWithAuth<IUser>({
			url: API_URL.users('/profile'),
			method: 'POST',
			data,
		})

		return response
	}

	async updateRole(id: string, role: string) {
		const response = await axiosWithAuth<IUser>({
			url: API_URL.users(`/profile/${id}`),
			method: 'PUT',
			data: { role },
		})

		return response
	}

	async getProfileToUpdate(id: string) {
		const response = await axiosWithAuth<IUser>({
			url: API_URL.users(`/profile/${id}`),
			method: 'GET',
		})

		return response
	}

	async toggleFavorite(productId: string) {
		return axiosWithAuth<IUser>({
			url: API_URL.users(`/profile/favorites/${productId}`),
			method: 'PATCH',
		})
	}
}

export const userService = new UserService()
