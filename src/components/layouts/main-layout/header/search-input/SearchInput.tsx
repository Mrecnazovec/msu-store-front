'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './SearchInput.module.scss'
import { Input } from '@/components/ui/form-elements/Input'
import { Button } from '@/components/ui/Button'
import { PUBLIC_URL } from '@/config/url.config'
import { Search } from 'lucide-react'

export function SearchInput() {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const router = useRouter()

	const handleSearch = () => {
		if (searchTerm.trim()) {
			router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`))
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleSearch()
		}
	}

	return (
		<div className={styles.form}>
			<Input placeholder='Поиск товаров' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
			<Button className='hover:bg-primary hover:text-primary-foreground hover:opacity-85 transition-all' size='icon' onClick={handleSearch}>
				<Search />
			</Button>
		</div>
	)
}
