import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from './Notification'
import anecdotesService from '../services/anecdotes'

const AnectdoteForm = props => {
  const dispatch = useDispatch()

  const addAnectdote = async event => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    const newAn = await anecdotesService.createNew(text)
    dispatch(createAnecdote(newAn))
    showNotification(dispatch, `'${text}' created!`)
  }

  return (
    <div>
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

export default AnectdoteForm
