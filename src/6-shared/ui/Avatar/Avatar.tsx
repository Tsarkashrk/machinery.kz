import Link from 'next/link'
import Image from 'next/image'

type Props = {
  link: string
  username?: string
  size?: 'big' | 'medium' | 'small' | 'profile'
  avatar?: string
}

const Avatar = ({ link, username, size = 'medium', avatar }: Props) => {
  return (
    <Link className={`avatar`} href={link}>
      <div className={`avatar__wrapper avatar__wrapper--${size}`}>{avatar ? <Image className="avatar__image" width={500} height={500} src={avatar} alt={'user logo'} /> : <p className="avatar__letter">{username?.charAt(0)}</p>}</div>
    </Link>
  )
}

export default Avatar
