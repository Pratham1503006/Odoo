'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UseRedirectOptions {
  to: string
  delay?: number
  condition?: boolean
}

export function useRedirect({ to, delay = 2000, condition = true }: UseRedirectOptions) {
  const router = useRouter()

  useEffect(() => {
    if (!condition) return

    const timer = setTimeout(() => {
      router.push(to)
    }, delay)

    return () => clearTimeout(timer)
  }, [router, to, delay, condition])
}

export function useRedirectToHome(delay = 2000) {
  return useRedirect({ to: '/', delay })
}
