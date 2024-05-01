// src/pages/CreatePost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost({ onAddPost }) {
  const [post, setPost] = useState({
    title: '',
    content: '',
    imageUrl: '',
    likes: 0,
    comments: [],
    createdAt: new Date().toLocaleString()
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPost({...post, id: Date.now(), createdAt: new Date().toLocaleString()}); // Add a timestamp
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:
        <input type="text" name="title" value={post.title} onChange={handleChange} required />
      </label>
      <label>Content:
        <textarea name="content" value={post.content} onChange={handleChange} />
      </label>
      <label>Image URL:
        <input type="text" name="imageUrl" value={post.imageUrl} onChange={handleChange} />
      </label>
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
