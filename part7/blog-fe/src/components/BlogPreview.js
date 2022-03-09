import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListItemText, ListItem, Divider } from '@mui/material'

const BlogPreview = ({ blog }) => {
  const blogStyle = {
    //paddingLeft: 2,
    //border: 'solid',
    //borderWidth: 1,
    //marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <ListItem button component={Link} to={`/blogs/${blog.id}`}>
        <ListItemText primary={blog.title} secondary={`by ${blog.author}`} />
      </ListItem>
      <Divider />
    </div>
  )
}

BlogPreview.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogPreview
