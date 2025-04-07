'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    BarChart3,
    LogIn,
    Menu,
    LayoutDashboard,
    LogOut,
    Vote,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/stores/useAuthStore'

interface MainLayoutProps {
    children: React.ReactNode
}

const defaultNavs = [
    {
        name: 'Results',
        href: '/results',
        icon: BarChart3,
    },
]
const publicNavs = [
    {
        name: 'Login',
        href: '/login',
        icon: LogIn,
    },
]
const privateNavs = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
]

export function MainLayout({ children }: MainLayoutProps) {
    const pathname = usePathname()
    const router = useRouter()

    const { user } = useAuth()
    const { setToken, isAuthenticated } = useAuthStore()

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [navs, setNavs] = useState([...defaultNavs])

    useEffect(() => {
        if (user) {
            setToken(user)
            if (isAuthenticated) {
                setNavs([...privateNavs, ...defaultNavs])
            } else {
                setNavs([...defaultNavs, ...publicNavs])
            }
        }
    }, [user])

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <LogoLink />
                        </div>

                        <nav className="hidden md:flex items-center space-x-4">
                            {navs.map((navigation) => {
                                const isActive = pathname === navigation.href
                                return (
                                    <Link
                                        href={navigation.href}
                                        key={navigation.name}
                                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                            isActive
                                                ? 'text-black'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <navigation.icon
                                            className={`mr-2 h-4 w-4 ${isActive ? 'text-black' : ''}`}
                                        />
                                        {navigation.name}
                                    </Link>
                                )
                            })}
                            {isAuthenticated && (
                                <Button>
                                    <Vote />
                                    Vote Now
                                </Button>
                            )}
                        </nav>

                        <div className="flex items-center md:hidden">
                            <Sheet
                                open={isMobileMenuOpen}
                                onOpenChange={setIsMobileMenuOpen}
                            >
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="w-[250px] sm:w-[300px]"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="pt-3 pl-3">
                                            <LogoLink />
                                        </div>
                                        <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
                                            <div className="px-2 space-y-1">
                                                {navs.map((navigation) => {
                                                    const isActive =
                                                        pathname ===
                                                        navigation.href
                                                    return (
                                                        <Link
                                                            key={
                                                                navigation.name
                                                            }
                                                            href={
                                                                navigation.href
                                                            }
                                                            className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                                                                isActive
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                            }`}
                                                            onClick={() =>
                                                                setIsMobileMenuOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <navigation.icon
                                                                className={`mr-4 flex-shrink-0 h-6 w-6 ${
                                                                    isActive
                                                                        ? 'text-gray-500'
                                                                        : 'text-gray-400 group-hover:text-gray-500'
                                                                }`}
                                                                aria-hidden="true"
                                                            />
                                                            {navigation.name}
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        </nav>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            <footer className="bg-white border-t py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-gray-500">
                        <p>
                            © 2025 iBoto. This is a demonstration application.
                        </p>
                        <p className="mt-1">
                            All data is stored locally in your browser and is
                            for demonstration purposes only.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function LogoLink() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">iBoto 2025 🇵🇭</span>
        </Link>
    )
}
