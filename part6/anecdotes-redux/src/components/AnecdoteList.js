import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnectdoteList = props => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anectdotes)
    .slice()
    .sort((a, b) => b.votes - a.votes)

  const vote = id => {
    dispatch(addVote(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
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
