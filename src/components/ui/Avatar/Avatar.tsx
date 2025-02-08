import Link from 'next/link'

interface IData {
  link: string
  username: string
}

const Avatar = (data: IData) => {
  return (
    <Link className="avatar" href={data?.link}>
      <p className="avatar__letter">{data?.username?.charAt(0)}</p>
    </Link>
  )
}

export default Avatar
