'use client'

interface ProfileStatsProps {
  followers: number
  following: number
  likes: number
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

export const ProfileStats = ({ followers, following, likes, className = '' }: ProfileStatsProps) => {
  const stats = [
    {
      label: 'Followers',
      value: followers,
      key: 'followers',
    },
    {
      label: 'Following',
      value: following,
      key: 'following',
    },
    {
      label: 'Likes',
      value: likes,
      key: 'likes',
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
