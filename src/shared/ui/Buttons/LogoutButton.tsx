'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ICON_SIZE } from '@/constants/constants'
import { authApi } from '@/shared/api'
import Button from './Button'
import { PLATFORM_PAGES } from '@/config/pages-url.config'

export function LogoutButton() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation<void, Error>({
    mutationKey: ['logout'],
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['profile'], null)
      queryClient.removeQueries({ queryKey: ['profile'] })
      router.push(PLATFORM_PAGES.HOME)
    },
    onError: (error) => {
      console.error('Logout failed:', error)
    },
  })

  return (
    <div className="logout">
      <Button variant="outlined" icon={<LogOut size={ICON_SIZE} />} onClick={() => mutate()} text={isPending ? 'Logging out...' : 'Logout'} isLoading={isPending} />
    </div>
  )
}
