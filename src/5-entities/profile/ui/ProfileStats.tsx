'use client'

interface ProfileStatsProps {
  equipment: number
  deals: number
  rating: number
  className?: string
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export const ProfileStats = ({ equipment, deals, rating, className = '' }: ProfileStatsProps) => {
  const stats = [
    {
      label: 'Объявлений',
      value: equipment,
      key: 'equipment',
    },
    {
      label: 'Сделок',
      value: deals,
      key: 'deals',
    },
    {
      label: 'Рейтинг',
      value: rating,
      key: 'rating',
    },
  ]

  return (
    <div className={`profile-stats ${className}`}>
      {stats.map((stat, index) => (
        <div key={stat.key} className="profile-stats__item">
          <div className="profile-stats__value">{formatNumber(stat.value)}</div>
          <div className="profile-stats__label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
