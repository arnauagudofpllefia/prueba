const API_BASE = 'http://localhost:3000'

export const fetchPosts = async () => {
  const response = await fetch(`${API_BASE}/posts`)
  if (!response.ok) throw new Error('Error fetching posts')
  return response.json()
}

export const createPost = async (post) => {
  const response = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  if (!response.ok) throw new Error('Error creating post')
  return response.json()
}

export const updatePost = async (id, post) => {
  const response = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  if (!response.ok) throw new Error('Error updating post')
  return response.json()
}

export const deletePost = async (id) => {
  const response = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Error deleting post')
}