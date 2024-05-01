// src/pages/PostDetail.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail({ posts, handleLike, addComment, updatePost, deletePost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));

  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });
  const [newComment, setNewComment] = useState('');

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedPost(prev => ({ ...prev, [name]: value }));
  };

  const submitEdit = () => {
    updatePost(editedPost);
    setEditMode(false);
  };

  const handleDelete = () => {
    deletePost(post.id);
    navigate('/'); // Redirect to the home page after deleting the post
  };

  const submitComment = (event) => {
    if (event.key === 'Enter' && newComment.trim() !== '') {
      addComment(post.id, newComment);
      setNewComment(''); // Clear the comment input after submission
    }
  };

  if (!post) return <div>Post not found.</div>;

  return (
    <div>
      {editMode ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          submitEdit();
        }}>
          <label>
            Title:
            <input type="text" name="title" value={editedPost.title} onChange={handleEditChange} />
          </label>
          <label>
            Content:
            <textarea name="content" value={editedPost.content} onChange={handleEditChange}></textarea>
          </label>
          <label>
            Image URL:
            <input type="text" name="imageUrl" value={editedPost.imageUrl} onChange={handleEditChange} />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete Post</button>
        </form>
      ) : (
        <>
          <h1>{post.title}</h1>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
          <p>{post.content}</p>
          <button onClick={() => handleLike(post.id)}>Like</button>
          <button onClick={() => setEditMode(true)}>Edit Post</button>
          <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete Post</button>
          <p>Likes: {post.likes}</p>
          {post.comments.map((comment, index) => <p key={index}>{comment}</p>)}
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={submitComment}
            placeholder="Add a comment..."
          />
          <p>Posted: {post.createdAt}</p>
        </>
      )}
    </div>
  );
}

export default PostDetail;
