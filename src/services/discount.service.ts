import { axiosClassic, axiosWithAuth } from '../api/api.interceptors'
import { API_URL } from '../config/api.config'
import { IDiscount, IDiscountInput } from '../shared/types/discount.interface'

class DiscountService {
	async getAll() {
		const { data } = await axiosWithAuth<IDiscount[]>({
			url: API_URL.discounts(),
			method: 'GET',
		})

		return data
	}

	async getById(id: string) {
		const { data } = await axiosWithAuth<IDiscount>({
			url: API_URL.discounts(`/${id}`),
			method: 'GET',
		})

		return data
	}

	async getByName(name: string) {
		const { data } = await axiosClassic<IDiscount>({
			url: API_URL.discounts(`/user/${name}`),
			method: 'GET',
		})

		return data
	}

	async use(id: string) {
		const { data } = await axiosClassic<IDiscount>({
			url: API_URL.discounts(`/${id}`),
			method: 'POST',
		})

		return data
	}

	async create(data: IDiscountInput, storeId: string) {
		const { data: createdDiscount } = await axiosWithAuth<IDiscount>({
			url: API_URL.discounts(),
			method: 'POST',
			data,
		})

		return createdDiscount
	}

	async update(id: string, data: IDiscountInput) {
		const { data: updatedDiscount } = await axiosWithAuth<IDiscount>({
			url: API_URL.discounts(`/${id}`),
			method: 'PUT',
			data,
		})

		return updatedDiscount
	}

	async delete(id: string) {
		const { data: deletedDiscount } = await axiosWithAuth<IDiscount>({
			url: API_URL.discounts(`/${id}`),
			method: 'DELETE',
		})

		return deletedDiscount
	}
}

export const discountService = new DiscountService()
