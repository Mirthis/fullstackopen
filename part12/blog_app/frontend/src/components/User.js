import React from 'react'
import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import BlogList from './BlogList'

const User = () => {
  const match = useMatch('/users/:id')
  const getUsers = state => state.users

  const users = useSelector(getUsers)
  const selectedUser = users.find(u => u.id === match.params.id)

  if (!selectedUser) return <p>User not found</p>

  return (
    <div>
      <Typography variant="h3" gutterBottom component="div" sx={{ mb: 0 }}>
        {selectedUser.name}
      </Typography>
      <Typography variant="h5" gutterBottom component="div" sx={{ mb: 0 }}>
        Added Blogs
      </Typography>
      <BlogList blogs={selectedUser.blogs} />
    </div>
  )
}

export default User
