import { useState } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import Footer from './components/Footer'
import Menu from './components/Menu'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`New anecdote ${anecdote.content} created!`)
    setTimeout(() => setNotification(null), 5000)
  }

  const anecdoteById = id => anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
  }
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <Notification text={notification} />}
      <Footer />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
    </div>
  )
}

export default App
