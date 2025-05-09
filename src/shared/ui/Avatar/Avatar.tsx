import Link from 'next/link'

interface AvatarProps {
  link: string
  username: string
}

const Avatar = (data: AvatarProps) => {
  return (
    <Link className="avatar" href={data?.link}>
      <div className="avatar__wrapper">
        <p className="avatar__letter">{data?.username?.charAt(0)}</p>
      </div>
    </Link>
  )
}

export default Avatar
