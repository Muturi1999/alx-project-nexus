'use client'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@/store'
import { setSidebarOpen } from '@/store/slices/uiSlice'
import { CATEGORIES } from '@/constants'

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const { sidebarOpen } = useAppSelector((state) => state.ui)
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  const closeSidebar = () => dispatch(setSidebarOpen(false))

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 md:hidden" onClose={closeSidebar}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={closeSidebar}
                >
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">B</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">ProDev Books</span>
                  </div>
                </div>
                
                {/* Navigation */}
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        <li>
                          <Link
                            href="/"
                            onClick={closeSidebar}
                            className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/books"
                            onClick={closeSidebar}
                            className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          >
                            All Books
                          </Link>
                        </li>
                        {isAuthenticated && user?.role === 'admin' && (
                          <li>
                            <Link
                              href="/admin"
                              onClick={closeSidebar}
                              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            >
                              Admin Panel
                            </Link>
                          </li>
                        )}
                      </ul>
                    </li>
                    
                    {/* Categories */}
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wide">
                        Categories
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {CATEGORIES.filter(cat => cat !== 'All').map((category) => (
                          <li key={category}>
                            <Link
                              href={`/books?category=${encodeURIComponent(category)}`}
                              onClick={closeSidebar}
                              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6"
                            >
                              {category}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
