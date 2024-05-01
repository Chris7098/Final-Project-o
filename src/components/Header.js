import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ onSearchChange }) {
  return (
    <header>
      <h1>🏆 Champions League 🏆</h1>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        onChange={onSearchChange}
      />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
      </nav>
    </header>
  );
}

export default Header;
