'use client'; // Add this directive to mark the file as a client component

import React, { useState } from 'react';

const CommentSection = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <div className="mb-4">
        {comments.length > 0 ? (
          <ul className="space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="border-b pb-2">{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={handleInputChange}
          placeholder="Add a comment"
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
