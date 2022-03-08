import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    replaceBlog(state, action) {
      const newBlog = action.payload
      return state.map(b => (b.id !== newBlog.id ? b : newBlog))
    },
    addComment(state, action) {
      const { blogId, newComment } = action.payload
      const toReplace = state.find(blog => blog.id === blogId)
      const newComments = toReplace.comments.concat(newComment)
      const newBlog = { ...toReplace, comments: newComments }
      return state.map(b => (b.id !== newBlog.id ? b : newBlog))
    },
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blogData => {
  return async dispatch => {
    const data = await blogService.create(blogData)
    data.user = blogData.user
    dispatch(appendBlog(data))
    return data
  }
}

export const commentBlog = (blogId, commentData) => {
  return async dispatch => {
    const newComment = await blogService.createComment(blogId, commentData)
    dispatch(addComment({ blogId, newComment }))
    return newComment
  }
}

export const likeBlog = blogData => {
  return async dispatch => {
    const newBlog = { ...blogData, likes: blogData.likes + 1 }
    const data = await blogService.update(newBlog)
    dispatch(replaceBlog(newBlog))
    return data
  }
}

export const deleteBlog = blogData => {
  return async dispatch => {
    const data = await blogService.remove(blogData)
    dispatch(removeBlog(blogData.id))
    return data
  }
}

export default blogSlice.reducer
export const { setBlogs, removeBlog, replaceBlog, appendBlog, addComment } =
  blogSlice.actions
