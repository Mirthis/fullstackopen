import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogPreview = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
    </div>
  )
}

BlogPreview.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogPreview