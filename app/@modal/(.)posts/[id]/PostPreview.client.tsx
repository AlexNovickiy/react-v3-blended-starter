'use client';

// import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
// import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { Post } from '@/types/post';
import { User } from '@/types/user';
import { fetchPostById, fetchUserById } from '@/lib/api';
// import { User } from '@/types/user';

export default function PostPreviewClient() {
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  useEffect(() => {
    const fn = async () => {
      try {
        const post = await fetchPostById(Number(id));
        const user = await fetchUserById(post.userId);
        setPost(post);
        setUser(user);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    };
    fn();
  }, []);

  if (isError) {
    return <div>Error loading post details</div>;
  }

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <button className={css.backBtn} onClick={handleClose}>
        ← Back
      </button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{post?.title}</h2>
          </div>

          <p className={css.content}>{post?.body}</p>
        </div>
        <p className={css.user}>Author: {user?.name}</p>
      </div>
    </Modal>
  );
}
