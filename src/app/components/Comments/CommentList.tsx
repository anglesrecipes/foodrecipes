import React from 'react';
import Image from 'next/image';
import { Comment } from './types';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6 mb-8">
      {comments.length === 0 ? (
        <p className="text-slate-500">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 border-b border-slate-100 pb-6">
            <div className="flex-shrink-0">
              <Image
                src={comment.author_avatar_urls['48'] || '/default-avatar.png'}
                alt={comment.author_name}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{comment.author_name}</span>
                <span className="text-sm text-slate-500">
                  {formatDate(comment.date)}
                </span>
              </div>
              <div
                className="text-slate-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};