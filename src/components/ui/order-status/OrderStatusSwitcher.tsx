'use client'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { STATUS_LIST } from '@/constants/orderStatus.constants'
import { useUpdateOrder } from '@/hooks/queries/orders/useUpdateOrder'
import { EnumOrderStatus } from '@/shared/types/order.interface'

interface OrderStatusSwitcherProps {
	className?: string
	id: string
	statusValue: string
}

export function OrderStatusSwitcher({ className, id, statusValue }: OrderStatusSwitcherProps) {
	const [isOpen, setIsOpen] = useState(false)
	const { updateOrder, isLoadingUpdate } = useUpdateOrder()
	const [value, setValue] = useState(STATUS_LIST.find(({ status }) => status === statusValue)?.statusName)

	const onStatusSelect = (status: EnumOrderStatus) => {
		updateOrder({ status, orderId: id })
		setIsOpen(false)
	}

	// const onStatusSelect = (status: string) => {
	// 	orderService.updateOrderStatus(id, status)
	// 	setIsOpen(false)
	// }

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='sm' role='combobox' aria-expanded={isOpen} aria-label='Оплата' className={cn('w-32', className)}>
					<p className='mt-1'>{STATUS_LIST.find(({ status }) => status === statusValue)?.statusName}</p>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn('w-32', className)}>
				<DropdownMenuLabel>Статус</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuRadioGroup value={value} onValueChange={setValue}>
					{STATUS_LIST.map((statusItem) => (
						<DropdownMenuRadioItem
							value={statusItem.statusName}
							key={statusItem.status}
							onClick={() => onStatusSelect(EnumOrderStatus[statusItem.status as keyof typeof EnumOrderStatus])}
							className='data-[state=checked]:text-accent-foreground data-[state=checked]:bg-accent mb-1 cursor-pointer'
						>
							{statusItem.statusName}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
