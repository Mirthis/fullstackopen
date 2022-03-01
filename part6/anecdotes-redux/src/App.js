import { useSelector, useDispatch } from 'react-redux'
import { addVote, createAnectdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
    .slice()
    .sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = id => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  const addAnectdote = event => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    dispatch(createAnectdote(text))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnectdote}>
        <div>
          <input name="text" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
