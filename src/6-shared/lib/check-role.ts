import { AccessMap, Role } from '../config/access.config'

export const hasAccess = (role: Role, pathname: string): boolean => {
  const allowedRoutes = AccessMap[role] || []
  return allowedRoutes.some((route) => pathname.startsWith(route))
}
