import React from 'react'
import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserPage = () => {
  const match = useMatch('/users/:id')
  const getUsers = state => state.users

  const users = useSelector(getUsers)
  const selectedUser = users.find(u => u.id === match.params.id)

  if (!selectedUser) return <p>User not found</p>

  return (
    <div>
      <h2>{selectedUser.name}</h2>
      <h3>Added Blogs</h3>
      {selectedUser.blogs.length ? (
        <ul>
          {selectedUser.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <p>No blogs added by this user</p>
      )}
    </div>
  )
}

export default UserPage
