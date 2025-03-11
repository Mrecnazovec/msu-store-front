import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/Sheet'
import { Menu } from 'lucide-react'
import { SideBar } from './SideBar'
import { useState } from 'react'

export function MobileSideBar() {
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className='lg:hidden pr-4 hover:opacity-75 transition'>
				<Menu />
			</SheetTrigger>
			<SheetContent side={'left'} className='p-0 bg-white'>
				<SheetTitle className='sr-only'>Меню навигации</SheetTitle>
				<SideBar />
			</SheetContent>
		</Sheet>
	)
}
