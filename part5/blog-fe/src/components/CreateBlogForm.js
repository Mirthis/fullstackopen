import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ createBlogHandler }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogSubmit = async e => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    const result = await createBlogHandler(newBlog)
    if (result) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <form onSubmit={createBlogSubmit}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  createBlogHandler: PropTypes.func.isRequired,
}

export default CreateBlogForm
