import React from 'react'

const CommentsList = ({ comments }) => {
  return (
    <div>
      {!comments.length ? (
        <p>No comments yet!</p>
      ) : (
        <ul>
          {comments.map(c => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CommentsList
