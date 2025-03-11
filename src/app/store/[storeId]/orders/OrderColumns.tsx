import { Button } from '@/components/ui/Button'
import { OrderDetail } from '@/components/ui/modals/OrderDetail'

import { OrderStatusSwitcher } from '@/components/ui/order-status/OrderStatusSwitcher'
import { ICartItem, ICartItemColumn } from '@/shared/types/cart.interface'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export interface IOrderColumns {
	id: string
	total: string
	createdAt: string
	name: string
	status: string
	email: string
	phone: string
	social: string
	items: ICartItemColumn[]
}

export const orderColumns: ColumnDef<IOrderColumns>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Id заказа
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Пользователь
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'total',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Стоимость
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Дата создания
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
	},

	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Статус
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => <OrderStatusSwitcher className='w-36' id={row.original.id} statusValue={row.original.status} />,
	},

	{
		accessorKey: 'action',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Детали
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => <OrderDetail data={row.original.items} />,
	},

	{
		accessorKey: 'social',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Телеграм
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
	},

	{
		accessorKey: 'phone',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Телефон
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
	},

	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Почта
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
	},
]
