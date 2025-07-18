import axios from "axios";
import { EditedPost, NewPost, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface ParamsType {
  _page: number;
  _limit: number;
  q?: string;
}

export const fetchPosts = async (searchText: string = "", page: number) => {
  const params: ParamsType = {
    _page: page,
    _limit: 8,
  };
  if (searchText) {
    params.q = searchText;
  }
  const response = await axios.get<Post[]>("/posts", {
    params,
  });
  return {
    posts: response.data,
    totalCount: Number(response.headers["x-total-count"]),
  };
};

export const createPost = async (newPost: NewPost) => {
  const response = await axios.post<Post>("/posts", newPost);
  return response.data;
};

export const editPost = async (postId: number, newDataPost: EditedPost) => {
  const response = await axios.patch<Post>(`/posts/${postId}`, newDataPost);
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete<Post>(`/posts/${postId}`);
  return response.data;
};
