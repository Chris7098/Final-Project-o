// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import Header from './components/Header';
import './App.css';

function App() {
  const yesterday = new Date(Date.now() - 86400000).toLocaleString();

  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: "Messi the goat over Ronaldo", 
      content: "Messi is the goat because he won the world cup.", 
      likes: 12, 
      comments: [],
      createdAt: yesterday 
    },
    { 
      id: 2, 
      title: "Ronaldo is the best Champions League player", 
      content: "Ronaldo has the most goals in the Champions League.", 
      likes: 25, 
      comments: [],
      createdAt: yesterday 
    }
  ]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (id) => {
    const updatedPosts = posts.map(post => {
      if (post.id === id) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const addComment = (id, comment) => {
    const updatedPosts = posts.map(post => {
      if (post.id === id) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const updatePost = (updatedPost) => {
    const newPosts = posts.map(post => {
      if (post.id === updatedPost.id) {
        return updatedPost;
      }
      return post;
    });
    setPosts(newPosts);
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home posts={posts} handleLike={handleLike} addComment={addComment} />} />
        <Route path="/create" element={<CreatePost onAddPost={addPost} />} />
        <Route path="/post/:id" element={<PostDetail posts={posts} handleLike={handleLike} addComment={addComment} updatePost={updatePost} deletePost={deletePost} />} />
        <Route path="/edit/:id" element={<EditPost posts={posts} updatePost={updatePost} />} />
      </Routes>
    </div>
  );
}

export default App;
