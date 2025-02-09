import React, { useState } from 'react';
import { Archivo } from "next/font/google";
import { CommentFormData } from './types';

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

interface CommentFormProps {
  postId: number;
  onCommentSubmitted: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentSubmitted }) => {
  const [formData, setFormData] = useState<CommentFormData>({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post: postId,
            author_name: formData.author_name,
            author_email: formData.author_email,
            content: formData.content,
          }),
        }
      );

      if (response.ok) {
        setSubmitMessage('Comment submitted successfully! It will appear after moderation.');
        setFormData({ author_name: '', author_email: '', content: '' });
        onCommentSubmitted();
      } else {
        const errorData = await response.json();
        setSubmitMessage(errorData.message || 'Error submitting comment. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Error submitting comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-slate-50 p-6 rounded-lg">
      <h3 className={`${archivo.className} text-xl font-semibold mb-4`}>
        Leave a Comment
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="author_name" className="block text-sm font-medium text-slate-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="author_name"
              name="author_name"
              required
              value={formData.author_name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label htmlFor="author_email" className="block text-sm font-medium text-slate-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="author_email"
              name="author_email"
              required
              value={formData.author_email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">
            Comment *
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={formData.content}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-500 text-white px-6 py-2 rounded-md font-medium hover:bg-amber-600 transition-colors disabled:bg-amber-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
        {submitMessage && (
          <p className={`text-sm ${submitMessage.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
            {submitMessage}
          </p>
        )}
      </form>
    </div>
  );
};
