import { fetchPosts } from '@/lib/api';
import PostsClient from './Posts.client';

type PostsPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function PostsPage({ params }: PostsPageProps) {
  const { slug } = await params;
  const { posts, totalCount } = await fetchPosts({
    searchText: '',
    page: 1,
    userId: slug[0] === 'All' ? undefined : slug[0],
  });

  return <PostsClient initialData={{ posts, totalCount }} userId={slug[0]} />;
}
