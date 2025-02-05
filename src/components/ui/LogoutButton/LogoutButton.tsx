'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'
import Button from '../Button/Button'
import { PLATFORM_PAGES } from '@/config/pages-url.config'

export function LogoutButton() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      router.push(PLATFORM_PAGES.LOGIN)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return (
    <div className="absolute top-1 right-1">
      <Button icon={<LogOut size={20} />} onClick={() => mutate()} text="Logout" />
    </div>
  )
}
