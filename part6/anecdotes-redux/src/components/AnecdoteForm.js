import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnectdoteForm = props => {
  const addAnectdote = async event => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    props.createAnecdote(text)
    props.setNotification(`'${text}' created!`, 3)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnectdoteForm)

export default connectedAnecdoteForm
