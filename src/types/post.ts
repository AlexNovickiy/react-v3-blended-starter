export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type NewPost = Omit<Post, "id" | "userId">;

export type EditedPost = Partial<Omit<Post, "id">>;
