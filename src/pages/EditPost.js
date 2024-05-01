import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', imageUrl: '' });

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching post:', error);
      else setPost(data);
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('posts')
      .update({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl
      })
      .eq('id', id);
    if (error) console.error('Error updating post:', error);
    else navigate(`/post/${id}`);
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
      <button type="submit">Update Post</button>
    </form>
  );
}

export default EditPost;
