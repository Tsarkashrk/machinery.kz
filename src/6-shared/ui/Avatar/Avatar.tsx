'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { ICON_SIZE } from '@/6-shared/constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '@/6-shared/api';
import { toast } from 'sonner';

type Props = {
  link: string;
  username?: string;
  size?: 'big' | 'medium' | 'small' | 'profile';
  type?: 'profile' | 'default';
  avatar?: string;
  onUpload?: (url: string) => void;
};

const Avatar = ({
  link,
  username,
  size = 'medium',
  type = 'default',
  avatar,
  onUpload,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['upload-image'],
    mutationFn: (formData: FormData) => profileApi.updateProfileImage(formData),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['profile'], updatedData);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Successfully edited!');
    },
    onError: () => {
      toast.error('Invalid credentials', { description: 'Try again!' });
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    mutate(formData);
  };

  return (
    <div
      className={`avatar ${size && `avatar--${size}`} ${type && `avatar--${type}`}`}
    >
      <Link
        href={type === 'profile' ? '' :  link}
        className="avatar__link"
      >
        <div className={`avatar__wrapper avatar__wrapper--${size}`}>
          {avatar ? (
            <Image
              className="avatar__image"
              src={avatar}
              width={500}
              height={500}
              alt="Аватар пользователя"
            />
          ) : (
            <p className="avatar__letter">{username?.charAt(0)}</p>
          )}
        </div>
      </Link>

      {type === 'profile' && (
        <div className='avatar__load'>
          <div
            className="avatar__upload"
            onClick={handleUploadClick}
            title="Загрузить фото"
          >
            <Upload
              className="avatar__button"
              size={ICON_SIZE}
            />
          </div>

          <input
            className="avatar__input"
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;
