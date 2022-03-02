import { useDispatch } from 'react-redux'
import { createAnectdote } from '../reducers/anecdoteReducer'
import { showNotification } from './Notification'

const AnectdoteForm = props => {
  const dispatch = useDispatch()

  const addAnectdote = event => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    dispatch(createAnectdote(text))
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
