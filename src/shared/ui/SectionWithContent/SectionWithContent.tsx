import { ReactNode } from 'react'

export const SectionWithContent = ({ children }: { children: ReactNode }) => {
  return <div className="section-with-content">{children}</div>
}
