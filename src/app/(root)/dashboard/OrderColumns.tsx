import { Button } from '@/components/ui/Button'
import { OrderDetail } from '@/components/ui/modals/OrderDetail'
import { STATUS_LIST } from '@/constants/orderStatus.constants'

import { ICartItemColumn } from '@/shared/types/cart.interface'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export interface IOrderColumns {
	total: string
	createdAt: string
	status: string
	items: ICartItemColumn[]

}

export const orderColumns: ColumnDef<IOrderColumns>[] = [
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
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Статус
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => <p>{STATUS_LIST.find(({ status }) => status === row.original.status)?.statusName}</p>,
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
]
