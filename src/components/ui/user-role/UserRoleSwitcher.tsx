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
import { useUpdateUserRole } from '@/hooks/queries/users/useUpdateRoleUser'
import { USER_ROLE } from '@/constants/userRole.constants'
import { userService } from '@/services/user.service'

interface UserRoleSwitcherProps {
	className?: string
	id: string
	roleValue: string
}

export function UserRoleSwitcher({ className, id, roleValue }: UserRoleSwitcherProps) {
	const [isOpen, setIsOpen] = useState(false)
	const { updateUser, isLoadingUpdate } = useUpdateUserRole()
	const [value, setValue] = useState(USER_ROLE.find(({ role }) => role === roleValue)?.roleName)

	const onRoleSelect = (data: string) => {
		updateUser({ data, userId: id })
		setIsOpen(false)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='sm' role='combobox' aria-expanded={isOpen} aria-label='Оплата' className={cn('w-32', className)}>
					<p className='mt-1'>{USER_ROLE.find(({ role }) => role === roleValue)?.roleName}</p>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn('w-32', className)}>
				<DropdownMenuLabel>Роль</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuRadioGroup value={value} onValueChange={setValue}>
					{USER_ROLE.map((roleItem) => (
						<DropdownMenuRadioItem
							value={roleItem.roleName}
							key={roleItem.role}
							onClick={() => onRoleSelect(roleItem.role)}
							className={`data-[state=checked]:text-accent-foreground data-[state=checked]:bg-accent mb-1 cursor-pointer ${roleItem.roleName === 'Владелец' && 'hidden'}`}
						>
							{roleItem.roleName}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
