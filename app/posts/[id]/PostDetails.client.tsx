'use client';

import { useParams, useRouter } from 'next/navigation';

import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { Post } from '@/types/post';

export default function PostDetailsClient() {
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  
  const handleClickBack = () => {
    router.back();
  };

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

  return (
    <>
      {post && user && (
        <div className={css.container}>
          <div className={css.item}>
            <button onClick={handleClickBack} className={css.backBtn}>
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
          </div>
        </div>
      )}
    </>
  );
}
