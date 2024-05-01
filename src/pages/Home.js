// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ posts, handleLike, addComment }) {
  const [sortKey, setSortKey] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    let updatedPosts = [...posts];

    // Filter by search query
    if (searchQuery) {
      updatedPosts = updatedPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort posts if sortKey is set
    if (sortKey === 'createdAt') {
      updatedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortKey === 'upvotes') {
      updatedPosts.sort((a, b) => b.likes - a.likes);
    }

    setFilteredPosts(updatedPosts);
  }, [sortKey, posts, searchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
        <option value="">Default</option>
        <option value="createdAt">Sort by Date</option>
        <option value="upvotes">Sort by Upvotes</option>
      </select>
      {filteredPosts.map(post => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post.id)}>Like</button>
          <input
            type="text"
            placeholder="Write a comment..."
            onKeyDown={(e) => e.key === 'Enter' && e.target.value.trim() !== '' ? addComment(post.id, e.target.value) : null}
          />
          {post.comments.map((comment, index) => <p key={index}>{comment}</p>)}
          <p>Posted: {post.createdAt}</p>
          <Link to={`/post/${post.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
