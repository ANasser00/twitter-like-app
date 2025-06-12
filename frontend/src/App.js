import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
import CreatePost from './components/create-post';
import PostsList from './components/posts-lists';
import Header from './components/header';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load posts when component mounts
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await apiService.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = async (text) => {
    try {
      const newPost = await apiService.createPost(text);
      // Add the new post to the beginning of the list
      setPosts(prevPosts => [{
        id: newPost.postId,
        text: newPost.text,
        timestamp: newPost.timestamp,
        likeCount: newPost.likeCount,
        likedByUser: false
      }, ...prevPosts]);
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    }
  };

  const handleToggleLike = async (postId) => {
    try {
      const result = await apiService.toggleLike(postId);
      
      // Update the post in the list
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                likedByUser: result.liked,
                likeCount: result.likeCount
              }
            : post
        )
      );
    } catch (err) {
      console.error('Error toggling like:', err);
      setError('Failed to update like. Please try again.');
    }
  };

  return (
    <div className="app">
      <Header />

      {error && (
        <div className="error">
          {error}
          <button 
            onClick={() => setError(null)}
            style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      <CreatePost onPostCreated={handlePostCreated} />
      
      <PostsList 
        posts={posts}
        loading={loading}
        onToggleLike={handleToggleLike}
      />
    </div>
  );
}

export default App;
