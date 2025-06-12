"use client"

import { useState } from "react"

const PostItem = ({ post, onToggleLike }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffInMinutes < 1) return "now"
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    return `${Math.floor(diffInMinutes / 1440)}d`
  }

  // Local state for optimistic update
  const [isLoading, setIsLoading] = useState(false)
  const [likedByUser, setLikedByUser] = useState(post.likedByUser)
  const [likeCount, setLikeCount] = useState(post.likeCount)

  const handleLikeClick = async () => {
    if (isLoading) return
    setIsLoading(true)

    // Save previous state to revert in case of failure
    const previousLiked = likedByUser
    const previousCount = likeCount

    // Optimistically update UI
    const newLiked = !likedByUser
    const newCount = likedByUser ? likeCount - 1 : likeCount + 1

    setLikedByUser(newLiked)
    setLikeCount(newCount)

    try {
      const result = await onToggleLike(post.id)

      // Optional: override with server result for safety
      if (result && typeof result.likeCount === "number" && typeof result.liked === "boolean") {
        setLikedByUser(result.liked)
        setLikeCount(result.likeCount)
      }
    } catch (error) {
      console.error("Error toggling like:", error)

      // Revert on failure
      setLikedByUser(previousLiked)
      setLikeCount(previousCount)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="post">
      <div className="post-text">{post.text}</div>
      <div className="post-footer">
        <span className="post-timestamp">{formatTimestamp(post.timestamp) + " ago"}</span>
        <div className="like-section">
          <button
            onClick={handleLikeClick}
            className={`like-button ${likedByUser ? "liked" : "not-liked"}`}
            title={likedByUser ? "Unlike" : "Like"}
            disabled={isLoading}
          >
            {likedByUser ? "❤️" : "🤍"}
          </button>
          <span className="like-count">{likeCount}</span>
        </div>
      </div>
    </div>
  )
}

export default PostItem
