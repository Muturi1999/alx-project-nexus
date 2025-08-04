'use client'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@/store'
import { setCartOpen, updateQuantity, removeFromCart } from '@/store/slices/cartSlice'
import { formatCurrency } from '@/utils'

export default function CartSlideOver() {
  const dispatch = useAppDispatch()
  const { isOpen, items, total, itemCount } = useAppSelector((state) => state.cart)

  const closeCart = () => dispatch(setCartOpen(false))

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const subtotal = total
  const shipping = total > 50 ? 0 : 4.99
  const tax = total * 0.1
  const grandTotal = subtotal + shipping + tax

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping Cart ({itemCount})
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={closeCart}
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {items.length === 0 ? (
                            <div className="text-center py-12">
                              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                                </svg>
                              </div>
                              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                              <p className="text-gray-500 mb-6">Add some books to get started!</p>
                              <button
                                onClick={closeCart}
                                className="btn-primary"
                              >
                                Continue Shopping
                              </button>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={item.image}
                                      alt={item.title}
                                      width={96}
                                      height={96}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link href={`/books/${item.id}`} onClick={closeCart}>
                                            {item.title}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">{formatCurrency(item.price)}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{item.author}</p>
                                      <p className="mt-1 text-xs text-blue-600">{item.category}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                          className="p-1 rounded hover:bg-gray-100"
                                          disabled={item.quantity <= 1}
                                        >
                                          <MinusIcon className="h-4 w-4" />
                                        </button>
                                        <span className="font-medium">{item.quantity}</span>
                                        <button
                                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                          className="p-1 rounded hover:bg-gray-100"
                                        >
                                          <PlusIcon className="h-4 w-4" />
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveItem(item.id)}
                                          className="font-medium text-red-600 hover:text-red-500"
                                        >
                                          <TrashIcon className="h-4 w-4" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>{formatCurrency(tax)}</span>
                          </div>
                          <div className="flex justify-between text-base font-medium text-gray-900 border-t pt-2">
                            <span>Total</span>
                            <span>{formatCurrency(grandTotal)}</span>
                          </div>
                        </div>
                        
                        {shipping > 0 && (
                          <p className="mt-2 text-sm text-gray-500">
                            Add {formatCurrency(50 - total)} more for free shipping
                          </p>
                        )}

                        <div className="mt-6">
                          <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 w-full"
                          >
                            Checkout
                          </Link>
                        </div>
                        
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              className="font-medium text-blue-600 hover:text-blue-500"
                              onClick={closeCart}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
