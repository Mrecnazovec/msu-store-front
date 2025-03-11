import { axiosWithAuth } from '../api/api.interceptors'
import { API_URL } from '../config/api.config'
import { EnumOrderStatus, IOrder, IOrderInput, IOrderStatus } from '../shared/types/order.interface'

class OrderService {
	async getOrdersByUser() {
		const response = await axiosWithAuth<IOrder[]>({
			url: API_URL.orders('/my'),
			method: 'GET',
		})

		return response
	}

	async getOrdersByStoreId(storeId: string) {
		const response = await axiosWithAuth<IOrder[]>({
			url: API_URL.orders(`/by-storeId/${storeId}`),
			method: 'GET',
		})

		return response
	}

	async getOrdersByUserId(userId: string) {
		const response = await axiosWithAuth<IOrder[]>({
			url: API_URL.orders(`/by-userId/${userId}`),
			method: 'GET',
		})

		return response
	}

	async getOrdersById(id: string) {
		const response = await axiosWithAuth<IOrder>({
			url: API_URL.orders(`/by-id/${id}`),
			method: 'GET',
		})

		return response
	}

	async getAllOrders() {
		const response = await axiosWithAuth<IOrder[]>({
			url: API_URL.orders(),
			method: 'GET',
		})

		return response
	}

	async createOrder(data: IOrderInput) {
		const response = await axiosWithAuth<IOrder[]>({
			url: API_URL.orders(),
			method: 'POST',
			data,
		})

		return response
	}

	async updateOrderStatus(id: string, status: EnumOrderStatus) {
    const response = await axiosWithAuth<IOrder>({
        url: API_URL.orders(`/${id}`),
        method: 'PUT',
        data: { status }, // Передаем объект с ключом status
    });

    return response;
}
}

export const orderService = new OrderService