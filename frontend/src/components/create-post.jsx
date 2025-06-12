"use client"

import { useState } from "react"

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim()) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("text", text.trim())
      if (selectedImage) {
        formData.append("image", selectedImage)
      }
      await onPostCreated(formData)
      setText("") // Clear the form
      setSelectedImage(null)
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  const remainingChars = 280 - text.length
  const isOverLimit = remainingChars < 0

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          maxLength={280}
          disabled={isLoading}
          className="w-full resize-none p-2 rounded border mb-2"

        />
        {/* Image preview
        {selectedImage && (
          <div className="post-button">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="max-h-64 object-cover rounded"
            />
          </div>
        )} */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isLoading}
          className="post-button"
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              color: isOverLimit ? "var(--error)" : remainingChars <= 20 ? "#ff8800" : "var(--text-muted)",
              fontSize: "14px",
              fontWeight: isOverLimit ? "bold" : "normal",
            }}
          >
            {remainingChars} characters remaining
          </span>
          <button 
          type="submit" 
          className="post-button" 
          disabled={!text.trim() || isLoading}>
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
