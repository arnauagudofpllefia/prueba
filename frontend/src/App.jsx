import { useState, useEffect } from 'react'
import './App.css'
import { fetchPosts, createPost, updatePost, deletePost } from './api.js'

function App() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ title: '', views: 0 })
  const [editingId, setEditingId] = useState(null)
  const [editPost, setEditPost] = useState({ title: '', views: 0 })

  const loadPosts = async () => {
    try {
      const data = await fetchPosts()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleCreate = async () => {
    try {
      await createPost(newPost)
      setNewPost({ title: '', views: 0 })
      loadPosts()
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleEdit = (post) => {
    setEditingId(post.id)
    setEditPost({ title: post.title, views: post.views })
  }

  const handleSave = async (id) => {
    try {
      await updatePost(id, editPost)
      setEditingId(null)
      loadPosts()
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deletePost(id)
      loadPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  return (
    <>
      <h1>Posts</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Views"
          value={newPost.views}
          onChange={(e) => setNewPost({ ...newPost, views: parseInt(e.target.value) || 0 })}
        />
        <button onClick={handleCreate}>Create Post</button>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {editingId === post.id ? (
              <>
                <input
                  type="text"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                />
                <input
                  type="number"
                  value={editPost.views}
                  onChange={(e) => setEditPost({ ...editPost, views: parseInt(e.target.value) || 0 })}
                />
                <button onClick={() => handleSave(post.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h2>{post.title}</h2>
                <p>Views: {post.views}</p>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
