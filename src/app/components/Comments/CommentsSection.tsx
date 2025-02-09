// import { useState, useEffect } from "react";
// import { getCommentsByPostId, submitComment } from "@/apis/graphql/content";

// interface Comment {
//   id: number;
//   content: string;
//   author: {
//     node: {
//       name: string;
//     };
//   };
//   date: string;
// }

// const CommentSection = ({ postId }: { postId: number }) => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [name, setName] = useState("");
//   const [content, setContent] = useState("");

//   // Fetch comments on component mount
//   useEffect(() => {
//     const fetchComments = async () => {
//       const comments = await getCommentsByPostId(postId);
//       setComments(comments);
//     };
//     fetchComments();
//   }, [postId]);

//   // Handle comment submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !content) return;

//     const newComment = await submitComment(postId, name, content);
//     if (newComment) {
//       setComments([...comments, newComment]); // Add the new comment to the list
//       setName("");
//       setContent("");
//     }
//   };

//   return (
//     <div className="lg:w-7/12 border-0 lg:border-x-2 border-slate-100 px-0 lg:px-8 mt-8">
//       <h2 className={`${archivo.className} text-2xl font-bold mb-4`}>
//         Comments
//       </h2>
//       <form onSubmit={handleSubmit} className="mb-8">
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-sm font-medium mb-1">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border border-slate-300 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="comment" className="block text-sm font-medium mb-1">
//             Comment
//           </label>
//           <textarea
//             id="comment"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full p-2 border border-slate-300 rounded"
//             rows={4}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Submit Comment
//         </button>
//       </form>
//       <div>
//         {comments.map((comment) => (
//           <div key={comment.id} className="mb-4 border-b border-slate-200 pb-4">
//             <p className="font-semibold">{comment.author.node.name}</p>
//             <p className="text-slate-600">{comment.content}</p>
//             <p className="text-sm text-slate-500">
//               {new Date(comment.date).toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentSection;

import React from 'react'

const CommentsSection = () => {
  return (
    <div>CommentsSection</div>
  )
}

export default CommentsSection