import { IUser } from './user.interface'

export interface IAuthForm {
	name: string
	email: string
	password: string
	phone: string
	social: string
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
}
