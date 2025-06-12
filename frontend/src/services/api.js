// API service that connects to your AWS Lambda backend

export const apiService = {
  // Base URL for your API - replace with your actual API Gateway URL
  baseUrl: process.env.REACT_APP_API_URL || "https://your-api-gateway-url.amazonaws.com",

  async getPosts() {
    try {
      // For development/testing, use mock data if API URL is not set
      if (!process.env.REACT_APP_API_URL) {
        console.warn("API URL not set, using mock data")
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return [
          {
            id: "1",
            text: "Just built an amazing social network app! 🚀 The UI is clean and responsive.",
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
            likeCount: 5,
            likedByUser: false,
          },
          {
            id: "2",
            text: "Beautiful sunset today! Nature never fails to amaze me. 🌅",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            likeCount: 12,
            likedByUser: true,
          },
        ]
      }

      const response = await fetch(`${this.baseUrl}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Your backend returns { posts: [...] }, so we extract the posts array
      return data.posts || []
    } catch (error) {
      console.error("Error fetching posts:", error)
      throw error
    }
  },

  async createPost(text) {
    try {
      // For development/testing, use mock data if API URL is not set
      if (!process.env.REACT_APP_API_URL) {
        console.warn("API URL not set, using mock data")
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        return {
          postId: Date.now().toString(),
          text,
          timestamp: new Date().toISOString(),
          likeCount: 0,
        }
      }

      const response = await fetch(`${this.baseUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Your backend returns { postId, text, timestamp, likeCount }
      return data
    } catch (error) {
      console.error("Error creating post:", error)
      throw error
    }
  },

  async toggleLike(postId) {
    try {
      // For development/testing, use mock data if API URL is not set
      if (!process.env.REACT_APP_API_URL) {
        console.warn("API URL not set, using mock data")
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Mock response - replace with actual API call
        const isLiked = Math.random() > 0.5
        return {
          liked: isLiked,
          likeCount: Math.floor(Math.random() * 20) + 1,
        }
      }

      const response = await fetch(`${this.baseUrl}/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Your backend returns { postId, liked, likeCount }
      return data
    } catch (error) {
      console.error("Error toggling like:", error)
      throw error
    }
  },
}
