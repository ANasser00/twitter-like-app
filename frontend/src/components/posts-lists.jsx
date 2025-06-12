import PostItem from "./post-item"

const PostsList = ({ posts, loading, onToggleLike }) => {
  if (loading) {
    return <div className="loading">Loading posts...</div>
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No posts yet</h3>
        <p>Be the first to share something!</p>
      </div>
    )
  }

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onToggleLike={onToggleLike} />
      ))}
    </div>
  )
}

export default PostsList
