import React from 'react'
import { Divider, List, ListItemText } from '@mui/material'

const CommentsList = ({ comments }) => {
  const formatTime = time => {
    const timeObj = new Date(time)
    return `${timeObj.getDate()}/${
      timeObj.getMonth() + 1
    }/${timeObj.getFullYear()} - ${timeObj.getHours()}:${String(
      timeObj.getMinutes()
    ).padStart(2, 0)}:${String(timeObj.getSeconds()).padStart(2, 0)} `
    //return time
  }

  return (
    <div>
      {!comments.length ? (
        <p>No comments yet!</p>
      ) : (
        <List>
          {comments.map(c => (
            <div key={c.id}>
              <ListItemText primary={c.text} secondary={formatTime(c.time)} />
              <Divider />
            </div>
          ))}
        </List>
      )}
    </div>
  )
}

export default CommentsList
