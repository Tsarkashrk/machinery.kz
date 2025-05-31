import Link from 'next/link'

type Props = {
  link: string
  username?: string
  size?: 'big' | 'medium' | 'small'
}

const Avatar = ({ link, username, size = 'medium' }: Props) => {
  return (
    <Link className={`avatar`} href={link}>
      <div className={`avatar__wrapper avatar__wrapper--${size}`}>
        <p className="avatar__letter">{username?.charAt(0)}</p>
      </div>
    </Link>
  )
}

export default Avatar
