'use client'

import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { CURRENCY_LIST } from '@/constants/currency.constants'
import { useGeo } from '@/hooks/queries/geo/useGeo'
import { useSwitchGeo } from '@/hooks/queries/geo/useSwitchGeo'
import { cn } from '@/lib/utils'
import { Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'

interface CurrencySwitcherProps {
	className?: string
}

export function CurrencySwitcher({ className }: CurrencySwitcherProps) {
	const [isOpen, setIsOpen] = useState(false)
	const { geo, isLoading } = useGeo()
	const { switchGeo, isSwitchGeo } = useSwitchGeo()
	const [value, setValue] = useState(geo)

	const onCurrencySelect = (currency: string) => {
		setIsOpen(false)
		switchGeo(currency)
	}

	useEffect(() => {
		setValue(geo)
	}, [geo])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='sm' role='combobox' aria-expanded={isOpen} aria-label='Оплата' className={cn('w-32', className)}>
					{isLoading ? (
						<Loader size='sm' />
					) : (
						<>
							<Wallet />
							<p className='mt-1'>{CURRENCY_LIST.find(({ currency }) => currency === geo)?.currencyName}</p>
						</>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-32'>
				<DropdownMenuLabel>Оплата</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{isLoading ? (
					<Loader size='sm' />
				) : (
					<DropdownMenuRadioGroup value={value} onValueChange={setValue}>
						{CURRENCY_LIST.map((currencyItem) => (
							<DropdownMenuRadioItem
								value={currencyItem.currency}
								key={currencyItem.currency}
								onClick={() => onCurrencySelect(currencyItem.currency)}
								className='data-[state=checked]:text-accent-foreground data-[state=checked]:bg-accent mb-1 cursor-pointer'
							>
								{currencyItem.currencyName}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
