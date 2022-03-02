import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnectdoteForm = props => {
  const dispatch = useDispatch()

  const addAnectdote = async event => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    dispatch(createAnecdote(text))
    dispatch(setNotification(`'${text}' created!`, 3))
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
