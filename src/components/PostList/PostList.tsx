import { useMutation } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface PostListProps {
  posts: Post[];
  toggleEditPost: (post: Post) => void;
}

export default function PostList({ posts, toggleEditPost }: PostListProps) {
  const mutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      alert("Post deleted successfully");
    },
  });

  const handleDeletePost = (postId: number) => {
    mutation.mutate(postId);
  };

  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li className={css.listItem} key={post.id}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button className={css.edit} onClick={() => toggleEditPost(post)}>
              Edit
            </button>
            <button onClick={() => handleDeletePost(post.id)} className={css.delete}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
