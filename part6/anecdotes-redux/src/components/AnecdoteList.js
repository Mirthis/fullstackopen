import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnectdoteList = props => {
  const dispatch = useDispatch()
  const allAnectdotes = useSelector(state => state.anectdotes)
  const filter = useSelector(state => state.filter)
  const filterAnectdotes = filter
    ? allAnectdotes.filter(an => an.content.includes(filter))
    : allAnectdotes
  const anectdotes = filterAnectdotes.slice().sort((a, b) => b.votes - a.votes)

  const vote = id => {
    dispatch(addVote(id))
    const anectdote = anectdotes.find(a => a.id === id)
    dispatch(setNotification(`You voted '${anectdote.content}'`, 3))
  }

  return (
    <div>
      {anectdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnectdoteList
