import axios from "axios";
import { Comment } from "@/apis/graphql/wordpress/types";

const API_URL = "https://dev-foudrecipes.pantheonsite.io/wp-json/wp/v2";

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await axios.get(`${API_URL}/comments`, {
      params: { post: postId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const postComment = async (
  postId: number,
  comment: string,
  authorName: string,
  authorEmail: string
): Promise<Comment> => {
  try {
    const response = await axios.post(`${API_URL}/comments`, {
      post: postId,
      content: comment,
      author_name: authorName,
      author_email: authorEmail,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

export const updateComment = async (commentId: number, content: string): Promise<Comment> => {
  try {
    const response = await axios.post(`${API_URL}/comments/${commentId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};
