export interface IColor {
	id: string;
	createdAt: string;
	name: string;
	value: string;
	images: { url: string }[];
	productId: string;
}

export interface IColorInput extends Pick<IColor, 'name' | 'value' | 'images'> {}