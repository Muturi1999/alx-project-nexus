import { useState, useEffect, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  hasNextPage: boolean
  loading: boolean
  threshold?: number
}

export function useInfiniteScroll({
  hasNextPage,
  loading,
  threshold = 100,
}: UseInfiniteScrollOptions) {
  const [isFetching, setIsFetching] = useState(false)

  const handleScroll = useCallback(() => {
    if (loading || !hasNextPage) return

    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      setIsFetching(true)
    }
  }, [loading, hasNextPage, threshold])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!isFetching) return
    setIsFetching(false)
  }, [isFetching])

  return isFetching
}